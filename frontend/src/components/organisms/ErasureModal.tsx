import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Flex, Loader, Modal } from "@mantine/core";

interface ErasureModal {
  open: boolean;
  handleClose: () => void;
  handleErase: (v: string) => void;
  mutate: () => void;
  image: string;
}

const ErasureModal = ({
  open,
  handleClose,
  handleErase,
  mutate,
  image,
}: ErasureModal) => {
  const [loading, setLoading] = useState(true);
  const [isErasing, setIsErasing] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current;
    const img = new Image();

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        img.onload = () => {
          setLoading(false);

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }

    img.src = image;
  }, [image]);

  useEffect(() => {
    drawImage();
  }, []);

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

  const handleSave = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const editedImage = canvas.toDataURL("image/png");
      await handleErase(editedImage);
      mutate();
    }
  };

  const handleReset = () => {
    drawImage();
  };

  return (
    <Modal opened={open} onClose={handleClose} title="Edit Image" size="auto">
      <Flex
        sx={{
          flexDirection: "column",
          padding: "24px",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && <Loader />}
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></canvas>
        <Button color="dark" onClick={handleSave} fullWidth>
          Save
        </Button>
        <Button color="dark" variant="outline" onClick={handleReset} fullWidth>
          Reset
        </Button>
      </Flex>
    </Modal>
  );
};

export default ErasureModal;
