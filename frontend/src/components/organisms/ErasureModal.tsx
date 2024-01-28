import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Flex, Loader, Modal, Textarea, Text } from "@mantine/core";

interface ErasureModal {
  open: boolean;
  handleClose: () => void;
  handleErase: (v: string, p: string) => void;
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
  const [url, setUrl] = useState<any>("");
  const [prompt, setPrompt] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCopyRef = useRef<HTMLCanvasElement | null>(null);

  const drawImage = useCallback(() => {
    // const img = new Image();

    // if (canvas && canvasCopy) {
    //   const ctx = canvas.getContext("2d");
    //   const ctxCopy = canvasCopy.getContext("2d");

    //   if (ctx && ctxCopy) {
    //     img.onload = () => {
    //       setLoading(false);

    //       canvas.width = img.width;
    //       canvas.height = img.height;

    //       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    //       canvasCopy.width = canvas.width;
    //       canvasCopy.height = canvas.height;

    //       ctxCopy.drawImage(canvas, 0, 0, canvasCopy.width, canvasCopy.height);
    //     };
    //   }
    // }
    // // img.setAttribute("crossorigin", "anonymous");
    // img.src = image;

    fetch(`http://localhost:5000/proxy?url=${encodeURIComponent(image)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Proxy error:", data.error);
          return;
        }

        const canvas = canvasRef.current;
        const img = new Image();

        img.onload = () => {
          if (canvas) {
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            if (ctx) {
              ctx.drawImage(img, 0, 0);
            }
          }
        };

        img.src = `data:image/png;base64,${data.image}`;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
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

        ctx.globalCompositeOperation = "destination-out"; // erase
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const handleSave = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      canvas.toBlob(async (blob) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const dataUrl = reader.result;
          setUrl(dataUrl);
          attemptErase(dataUrl, prompt);
        };
        blob && reader.readAsDataURL(blob);
      }, "image/png");
    }
  };

  const handleReset = () => {
    drawImage();
  };

  const attemptErase = useCallback(
    async (url: any, prompt: any) => {
      await handleErase(url, prompt);
      mutate();
    },
    [handleErase, mutate]
  );

  // useEffect(() => {
  //   if (url && prompt) {
  //     attemptErase(url, prompt);
  //   }
  // }, [url, prompt]);

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
        {/* <canvas
          ref={canvasCopyRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></canvas> */}
        <Text>
          Click and drag to erase areas on the image directly. Enter what you
          want to replace erased parts with below.
        </Text>
        <Textarea
          autosize
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          placeholder="Start typing here..."
          sx={{ width: "100%" }}
          styles={{
            input: { fontSize: "14px", overflow: "hidden" },
          }}
        />
        <Flex sx={{ width: "100%", gap: "8px", justifyContent: "flex-end" }}>
          <Button color="dark" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button color="dark" onClick={handleSave}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ErasureModal;
