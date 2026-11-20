
import { useEditorStore } from "../../stores/editorStore";

import {
  createDocument,
} from "../../constants/canvas.constants";

import type {
  PageOrientation,
  PagePreset,
} from "../../types/editor.types";

export default function PageSettings() {
  const document = useEditorStore(
    (state) => state.document
  );

  const setDocument = useEditorStore(
    (state) => state.setDocument
  );

  const updatePreset = (preset: PagePreset) => {
    setDocument(
      createDocument(preset, document.orientation)
    );
  };

  const updateOrientation = (
    orientation: PageOrientation
  ) => {
    setDocument(
      createDocument(document.preset, orientation)
    );
  };

  const updateCustomDimension = (
    field: "width" | "height",
    value: number
  ) => {
    setDocument({
      ...document,
      preset: "CUSTOM",
      [field]: value,
    });
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-white space-y-4">

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Page size
        </label>

        <select
          value={document.preset}
          onChange={(e) =>
            updatePreset(e.target.value as PagePreset)
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="A4">A4</option>
          <option value="A5">A5</option>
          <option value="CUSTOM">Custom</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Orientation
        </label>

        <div className="grid grid-cols-2 gap-2">

          <button
            onClick={() => updateOrientation("landscape")}
            className={`py-2 rounded-lg border text-sm ${
              document.orientation === "landscape"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-600"
            }`}
          >
            Landscape
          </button>

          <button
            onClick={() => updateOrientation("portrait")}
            className={`py-2 rounded-lg border text-sm ${
              document.orientation === "portrait"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-600"
            }`}
          >
            Portrait
          </button>

        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Dimensions (px)
        </label>

        <div className="grid grid-cols-2 gap-2">

          <div>
            <span className="text-xs text-gray-400">
              Width
            </span>

            <input
              type="number"
              min={100}
              max={5000}
              value={document.width}
              onChange={(e) =>
                updateCustomDimension(
                  "width",
                  Math.max(100, Number(e.target.value))
                )
              }
              className="w-full border rounded-lg px-2 py-2 text-sm"
            />
          </div>

          <div>
            <span className="text-xs text-gray-400">
              Height
            </span>

            <input
              type="number"
              min={100}
              max={5000}
              value={document.height}
              onChange={(e) =>
                updateCustomDimension(
                  "height",
                  Math.max(100, Number(e.target.value))
                )
              }
              className="w-full border rounded-lg px-2 py-2 text-sm"
            />
          </div>

        </div>
      </div>

      <div className="text-xs text-gray-400">
        {document.width} × {document.height} px
      </div>

    </div>
  );
}