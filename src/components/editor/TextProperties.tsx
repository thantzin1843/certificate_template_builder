
import { useEditorStore } from "../../stores/editorStore";

import type { StaticTextElement } from "../../types/element.types";

const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Tahoma",
  "Courier New",
];

export default function TextProperties() {
  const elements = useEditorStore(
    (state) => state.elements
  );

  const selectedElementId = useEditorStore(
    (state) => state.selectedElementId
  );

  const updateElement = useEditorStore(
    (state) => state.updateElement
  );

  const element = elements.find(
    (item) => item.id === selectedElementId
  ) as StaticTextElement | undefined;

  if (!element) {
    return null;
  }

  const update = (
    updates: Partial<StaticTextElement>
  ) => {
    updateElement(element.id, updates);
  };

  const isBold =
    element.fontStyle === "bold" ||
    element.fontStyle === "bold italic";

  const isItalic =
    element.fontStyle === "italic" ||
    element.fontStyle === "bold italic";

  const toggleBold = () => {
    const nextBold = !isBold;

    const nextStyle = [
      nextBold ? "bold" : "",
      isItalic ? "italic" : "",
    ]
      .filter(Boolean)
      .join(" ") || "normal";

    update({
      fontStyle: nextStyle as StaticTextElement["fontStyle"],
    });
  };

  const toggleItalic = () => {
    const nextItalic = !isItalic;

    const nextStyle = [
      isBold ? "bold" : "",
      nextItalic ? "italic" : "",
    ]
      .filter(Boolean)
      .join(" ") || "normal";

    update({
      fontStyle: nextStyle as StaticTextElement["fontStyle"],
    });
  };

  const toggleUnderline = () => {
    update({
      textDecoration:
        element.textDecoration === "underline"
          ? "none"
          : "underline",
    });
  };

  return (
    <div className="p-4 space-y-5">

      <div>
        <h3 className="font-semibold text-gray-800">
          Text properties
        </h3>

        <p className="text-xs text-gray-400 mt-1">
          Customize the selected text
        </p>
      </div>

      {/* Font family */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">
          Font family
        </label>

        <select
          value={element.fontFamily}
          onChange={(e) =>
            update({ fontFamily: e.target.value })
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Font size */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">
          Font size
        </label>

        <input
          type="number"
          min={1}
          max={300}
          value={element.fontSize}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value > 0 && value <= 300) {
              update({ fontSize: value });
            }
          }}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Font styles */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">
          Font style
        </label>

        <div className="grid grid-cols-3 gap-2">

          <button
            onClick={toggleBold}
            className={`py-2 border rounded-lg font-bold ${
              isBold
                ? "bg-blue-50 border-blue-500 text-blue-600"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            B
          </button>

          <button
            onClick={toggleItalic}
            className={`py-2 border rounded-lg italic ${
              isItalic
                ? "bg-blue-50 border-blue-500 text-blue-600"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            I
          </button>

          <button
            onClick={toggleUnderline}
            className={`py-2 border rounded-lg underline ${
              element.textDecoration === "underline"
                ? "bg-blue-50 border-blue-500 text-blue-600"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            U
          </button>

        </div>
      </div>

      {/* Text color */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">
          Text color
        </label>

        <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-2">

          <input
            type="color"
            value={element.fill}
            onChange={(e) =>
              update({ fill: e.target.value })
            }
            className="w-9 h-9 cursor-pointer"
          />

          <input
            type="text"
            value={element.fill}
            onChange={(e) =>
              update({ fill: e.target.value })
            }
            className="flex-1 min-w-0 text-sm uppercase outline-none"
          />

        </div>
      </div>

      {/* Alignment */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">
          Text alignment
        </label>

        <select
          value={element.align}
          onChange={(e) =>
            update({
              align: e.target.value as StaticTextElement["align"],
            })
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>


{/* Letter Spacing */}
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Letter Spacing
  </label>

  <div className="flex items-center gap-2">
    <input
      type="range"
      min={-2}
      max={20}
      step={0.5}
      value={element.letterSpacing}
      onChange={(e) =>
        updateElement(element.id, {
          letterSpacing: Number(e.target.value),
        })
      }
      className="flex-1"
    />

    <input
      type="number"
      min={-2}
      max={20}
      step={0.5}
      value={element.letterSpacing}
      onChange={(e) =>
        updateElement(element.id, {
          letterSpacing: Number(e.target.value),
        })
      }
      className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
    />
  </div>
</div>

{/* Line Spacing */}
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Line Spacing
  </label>

  <div className="flex items-center gap-2">
    <input
      type="range"
      min={0.8}
      max={3}
      step={0.1}
      value={element.lineHeight}
      onChange={(e) =>
        updateElement(element.id, {
          lineHeight: Number(e.target.value),
        })
      }
      className="flex-1"
    />

    <input
      type="number"
      min={0.8}
      max={3}
      step={0.1}
      value={element.lineHeight}
      onChange={(e) =>
        updateElement(element.id, {
          lineHeight: Number(e.target.value),
        })
      }
      className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
    />
  </div>
</div>


{/* Rotation */}
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Rotation
  </label>

  <div className="flex items-center gap-2">
    <input
      type="range"
      min={-180}
      max={180}
      step={1}
      value={element.rotation}
      onChange={(e) =>
        updateElement(element.id, {
          rotation: Number(e.target.value),
        })
      }
      className="flex-1"
    />

    <input
      type="number"
      min={-360}
      max={360}
      step={1}
      value={element.rotation}
      onChange={(e) =>
        updateElement(element.id, {
          rotation: Number(e.target.value),
        })
      }
      className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
    />
  </div>

  <button
    type="button"
    onClick={() =>
      updateElement(element.id, { rotation: 0 })
    }
    className="text-xs text-blue-600 hover:underline"
  >
    Reset rotation
  </button>
</div>

    </div>
  );
}