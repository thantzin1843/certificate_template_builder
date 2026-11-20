
import {
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react";


import { useEditorStore } from "../../stores/editorStore";
import DesignCanvas from "../../canvas/DesignCanvas";

export default function CanvasWorkspace() {
  const zoom = useEditorStore(
    (state) => state.zoom
  );

  const zoomIn = useEditorStore(
    (state) => state.zoomIn
  );

  const zoomOut = useEditorStore(
    (state) => state.zoomOut
  );

  const resetZoom = useEditorStore(
    (state) => state.resetZoom
  );

  return (
    <main className="flex-1 min-w-0 bg-[#F1F2F5] flex flex-col overflow-hidden">

      {/* Workspace toolbar */}
      <div className="h-12 px-5 flex items-center justify-between border-b border-gray-200 bg-white shrink-0">

        <span className="text-sm text-gray-500">
          Canvas
        </span>

        <div className="flex items-center gap-2 text-gray-500">

          <button
            onClick={zoomOut}
            disabled={zoom <= 0.1}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30"
            title="Zoom out"
          >
            <ZoomOut size={17} />
          </button>

          <span className="text-xs w-12 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={zoom >= 2}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30"
            title="Zoom in"
          >
            <ZoomIn size={17} />
          </button>

          <button
            onClick={resetZoom}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Reset zoom"
          >
            <Maximize size={17} />
          </button>

        </div>
      </div>

      {/* Canvas viewport */}
      <div className="flex-1 overflow-auto">

        <div className="min-h-full min-w-full w-fit flex items-center justify-center p-8">

          <DesignCanvas />

        </div>

      </div>

    </main>
  );
}