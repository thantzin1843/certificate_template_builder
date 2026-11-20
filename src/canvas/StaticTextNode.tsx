
import { useRef } from "react";
import { Text } from "react-konva";
import type Konva from "konva";


import TextTransformer from "./TextTransformer";
import type { StaticTextElement } from "../types/element.types";
import { useEditorStore } from "../stores/editorStore";
import { calculateTextHeight } from "../utils/textLayout";

interface Props {
  element: StaticTextElement;
  isEditing: boolean;
  onStartEditing: (element: StaticTextElement) => void;
}

export default function StaticTextNode({
  element,
  isEditing,
  onStartEditing,
}: Props) {
  const textRef = useRef<Konva.Text | null>(null);

  const selectedElementId = useEditorStore(
    (state) => state.selectedElementId
  );
  const selectElement = useEditorStore(
    (state) => state.selectElement
  );
  const moveElement = useEditorStore(
    (state) => state.moveElement
  );
  const updateElement = useEditorStore(
    (state) => state.updateElement
  );

  const isSelected = selectedElementId === element.id;

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    moveElement(element.id, e.target.x(), e.target.y());
  };

  

const handleTransformEnd = () => {
  const node = textRef.current;
  if (!node) return;

  const newWidth = Math.max(80, node.width() * node.scaleX());

  node.scaleX(1);
  node.scaleY(1);

  updateElement(element.id, {
    x: node.x(),
    y: node.y(),
    width: newWidth,
  });
};

  return (
    <>
      <Text
        ref={textRef}
        id={element.id}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        text={element.text}
        fontSize={element.fontSize}
        fontFamily={element.fontFamily}
        fontStyle={element.fontStyle}
        textDecoration={element.textDecoration}
        fill={element.fill}
        align={element.align}
        lineHeight={element.lineHeight}
        wrap={element.wrap}
        draggable={!isEditing}
        visible={!isEditing}
        onMouseDown={() => selectElement(element.id)}
        onTouchStart={() => selectElement(element.id)}
        onDblClick={() => onStartEditing(element)}
        onDragStart={() => selectElement(element.id)}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />

      {isSelected && !isEditing && (
        <TextTransformer nodeRef={textRef} />
      )}
    </>
  );
}