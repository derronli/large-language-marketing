import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Button,
  Flex,
  Modal,
  Textarea,
  Text,
  LoadingOverlay,
} from "@mantine/core";

const baseURL = import.meta.env.VITE_BASE_URL;

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
  const [loading, setLoading] = useState(false);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawImage = useCallback(() => {
    fetch(`${baseURL}/proxy?url=${encodeURIComponent(image)}`)
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
      setLoading(true);
      await handleErase(url, prompt);
      await mutate();
      setLoading(false);
      handleClose();
    },
    [handleErase, mutate]
  );

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
        {loading && (
          <LoadingOverlay visible={loading} zIndex={1000} overlayBlur={2} />
        )}
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></canvas>
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
