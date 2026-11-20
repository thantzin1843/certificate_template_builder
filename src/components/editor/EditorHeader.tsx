
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Download,
  Save,
} from "lucide-react";

export default function EditorHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-5 shrink-0">

      {/* Left section */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="font-semibold text-gray-800">
            Certificate Designer
          </h1>
          <p className="text-xs text-gray-400">
            Untitled design
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          title="Undo"
          disabled
        >
          <Undo2 size={19} />
        </button>

        <button
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          title="Redo"
          disabled
        >
          <Redo2 size={19} />
        </button>

        <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">
          <Download size={16} />
          Export
        </button>

        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Save size={16} />
          Save
        </button>
      </div>

    </header>
  );
}