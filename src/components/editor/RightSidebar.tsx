
import PageSettings from "./PageSettings";
import TextProperties from "./TextProperties";

import { useEditorStore } from "../../stores/editorStore";

export default function RightSidebar() {
  const selectedElementId = useEditorStore(
    (state) => state.selectedElementId
  );

  return (
    <aside className="w-72 bg-white border-l border-gray-200 shrink-0 overflow-y-auto">

      {selectedElementId ? (
        <TextProperties />
      ) : (
        <>
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">
              Document settings
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Configure your certificate page
            </p>
          </div>

          <PageSettings />
        </>
      )}

    </aside>
  );
}