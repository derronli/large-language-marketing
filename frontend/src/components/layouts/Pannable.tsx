import { ReactJSXElement } from "node_modules/@emotion/react/types/jsx-namespace";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Pannable = ({ children }: { children: ReactJSXElement }) => {
  return (
    <TransformWrapper
      limitToBounds={false}
      initialScale={0.75}
      initialPositionX={100}
      initialPositionY={100}
      minScale={0.25}
      maxScale={1.5}
      doubleClick={{ disabled: true }}
      panning={{ excluded: ["textarea", "button"] }}
    >
      <TransformComponent>{children}</TransformComponent>
    </TransformWrapper>
  );
};

export default Pannable;
