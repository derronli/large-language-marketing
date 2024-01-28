import React, { useState, useRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";

const ErasureModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const [isErasing, setIsErasing] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const image = new Image();

      image.onload = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
          }
        }
      };

      image.src = URL.createObjectURL(file);
    }
  };

  const handleMouseDown = () => {
    setIsErasing(true);
  };

  const handleMouseUp = () => {
    setIsErasing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isErasing && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const x = e.clientX - canvas.getBoundingClientRect().left;
        const y = e.clientY - canvas.getBoundingClientRect().top;

        ctx.globalCompositeOperation = "destination-out"; // Set to erase mode
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const editedImage = canvas.toDataURL("image/png");
      // Send `editedImage` to your server or perform any other desired actions.
    }
  };

  const handleReset = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Image" size="auto">
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown} // Prevent text selection while erasing
          onMouseUp={handleMouseUp}
          width={500} // Set your desired canvas width
          height={500} // Set your desired canvas height
          style={{ border: "1px solid black" }}
        ></canvas>
      </Modal>
      <Button onClick={open}>Open modal</Button>
    </>
  );
};

export default ErasureModal;