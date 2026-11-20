
import EditorHeader from "./EditorHeader";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import CanvasWorkspace from "./CanvasWorkspace";

export default function EditorLayout() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">

      <EditorHeader />

      <div className="flex flex-1 min-h-0">

        <LeftSidebar />

        <CanvasWorkspace />

        <RightSidebar />

      </div>

    </div>
  );
}