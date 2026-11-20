
import { useEffect, useRef } from "react";
import { Transformer } from "react-konva";
import type Konva from "konva";
import type { RefObject } from "react";

interface Props {
  nodeRef: RefObject<Konva.Text | null>;
}

export default function TextTransformer({ nodeRef }: Props) {
  const transformerRef =
    useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    const transformer = transformerRef.current;
    const node = nodeRef.current;

    if (!transformer || !node) return;

    transformer.nodes([node]);

    transformer.getLayer()?.batchDraw();

    return () => {
      transformer.nodes([]);
    };
  }, [nodeRef]);

  return (
    <Transformer
      ref={transformerRef}
      enabledAnchors={[
        "middle-left",
        "middle-right",
      ]}
      rotateEnabled={false}
      keepRatio={false}
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 80) {
          return oldBox;
        }

        return newBox;
      }}
      borderStroke="#2563eb"
      borderStrokeWidth={1}
      anchorStroke="#2563eb"
      anchorFill="#ffffff"
      anchorSize={9}
      anchorCornerRadius={2}
      padding={2}
    />
  );
}