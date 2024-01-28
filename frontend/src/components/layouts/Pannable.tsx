import { Flex } from "@mantine/core";
import { ReactJSXElement } from "node_modules/@emotion/react/types/jsx-namespace";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Pannable = ({ children }: { children: ReactJSXElement }) => {
  return (
    <Flex
      sx={{
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        cursor: "grab",
      }}
    >
      <TransformWrapper
        limitToBounds={false}
        initialScale={1}
        initialPositionX={-500}
        minScale={0.25}
        maxScale={3}
        doubleClick={{ disabled: true }}
        panning={{ excluded: ["textarea", "button"] }}
      >
        <TransformComponent>{children}</TransformComponent>
      </TransformWrapper>
    </Flex>
  );
};

export default Pannable;
