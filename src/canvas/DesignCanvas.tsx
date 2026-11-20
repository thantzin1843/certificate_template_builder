
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

import StaticTextNode from "./StaticTextNode";
import { useEditorStore } from "../stores/editorStore";
import { calculateTextHeight } from "../utils/textLayout";
import type { StaticTextElement } from "../types/element.types";

export default function DesignCanvas() {
  const canvasDocument = useEditorStore((state) => state.document);
  const zoom = useEditorStore((state) => state.zoom);
  const elements = useEditorStore((state) => state.elements);
  const selectElement = useEditorStore((state) => state.selectElement);
  const updateElement = useEditorStore((state) => state.updateElement);

  const [editingElementId, setEditingElementId] = useState<string | null>(
    null
  );
  const [draftText, setDraftText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cancelledRef = useRef(false);

  const editingElement = elements.find(
    (element) => element.id === editingElementId
  );

  const editingHeight =
    editingElement?.type === "static-text"
      ? calculateTextHeight({
          text: draftText,
          width: editingElement.width,
          fontSize: editingElement.fontSize,
          fontFamily: editingElement.fontFamily,
          fontStyle: editingElement.fontStyle,
          lineHeight: editingElement.lineHeight,
          wrap: editingElement.wrap,
        })
      : 0;

  useEffect(() => {
    if (!editingElementId) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus();

    const end = textarea.value.length;
    textarea.setSelectionRange(end, end);
  }, [editingElementId]);

  const handleStartEditing = (element: StaticTextElement) => {
    cancelledRef.current = false;
    selectElement(element.id);
    setDraftText(element.text);
    setEditingElementId(element.id);
  };

  const handleCommitEditing = () => {
    if (cancelledRef.current) {
      cancelledRef.current = false;
      return;
    }

    if (!editingElementId || !editingElement) return;

    const height = calculateTextHeight({
      text: draftText,
      width: editingElement.width,
      fontSize: editingElement.fontSize,
      fontFamily: editingElement.fontFamily,
      fontStyle: editingElement.fontStyle,
      lineHeight: editingElement.lineHeight,
      wrap: editingElement.wrap,
    });

    updateElement(editingElementId, {
      text: draftText,
      height,
    });

    setEditingElementId(null);
  };

  const handleCancelEditing = () => {
    cancelledRef.current = true;
    setEditingElementId(null);
  };

  return (
    <div
      className="relative shrink-0"
      style={{
        width: canvasDocument.width * zoom,
        height: canvasDocument.height * zoom,
      }}
    >
      <div
        className="absolute top-0 left-0 bg-white shadow-lg border border-gray-300"
        style={{
          width: canvasDocument.width,
          height: canvasDocument.height,
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
        }}
      >
        <Stage
          width={canvasDocument.width}
          height={canvasDocument.height}
          onMouseDown={(e) => {
            if (e.target === e.target.getStage()) {
              selectElement(null);
            }
          }}
          onTouchStart={(e) => {
            if (e.target === e.target.getStage()) {
              selectElement(null);
            }
          }}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={canvasDocument.width}
              height={canvasDocument.height}
              fill={canvasDocument.background}
              listening={false}
            />

            {elements.map((element) => {
              if (element.type === "static-text") {
                return (
                  <StaticTextNode
                    key={element.id}
                    element={element}
                    isEditing={editingElementId === element.id}
                    onStartEditing={handleStartEditing}
                  />
                );
              }

              return null;
            })}
          </Layer>
        </Stage>

        {editingElement?.type === "static-text" && (
          <textarea
            ref={textareaRef}
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onBlur={handleCommitEditing}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                handleCancelEditing();
              }
            }}
            spellCheck={false}
            style={{
              position: "absolute",
              left: editingElement.x,
              top: editingElement.y,
              width: editingElement.width,
              height: editingHeight,

              margin: 0,
              padding: 0,
              boxSizing: "border-box",

              fontFamily: editingElement.fontFamily,
              fontSize: editingElement.fontSize,
              fontWeight: editingElement.fontStyle.includes("bold")
                ? "bold"
                : "normal",
              fontStyle: editingElement.fontStyle.includes("italic")
                ? "italic"
                : "normal",
              textDecoration: editingElement.textDecoration,
              textAlign: editingElement.align,
              lineHeight: editingElement.lineHeight,
              color: editingElement.fill,

              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              overflow: "hidden",

              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #2563eb",
              outline: "none",
              resize: "none",
              zIndex: 10,
            }}
          />
        )}
      </div>
    </div>
  );
}