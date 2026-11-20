
import {
  Type,
  Image,
  Shapes,
  Layers,
} from "lucide-react";

import { useEditorStore } from "../../stores/editorStore";

export default function LeftSidebar() {
  const addTextElement = useEditorStore(
    (state) => state.addTextElement
  );

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-5 gap-5 shrink-0">

      {/* Text */}
      <button
        onClick={addTextElement}
        className="flex flex-col items-center gap-1 text-blue-600"
      >
        <div className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl">
          <Type size={22} />
        </div>

        <span className="text-xs">
          Text
        </span>
      </button>

      {/* Images */}
      <button
        disabled
        className="flex flex-col items-center gap-1 text-gray-400"
      >
        <div className="p-3 rounded-xl">
          <Image size={22} />
        </div>

        <span className="text-xs">
          Images
        </span>
      </button>

      {/* Elements */}
      <button
        disabled
        className="flex flex-col items-center gap-1 text-gray-400"
      >
        <div className="p-3 rounded-xl">
          <Shapes size={22} />
        </div>

        <span className="text-xs">
          Elements
        </span>
      </button>

      {/* Layers */}
      <button
        disabled
        className="flex flex-col items-center gap-1 text-gray-400"
      >
        <div className="p-3 rounded-xl">
          <Layers size={22} />
        </div>

        <span className="text-xs">
          Layers
        </span>
      </button>

    </aside>
  );
}