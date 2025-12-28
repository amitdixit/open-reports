import type { ReportItemType } from "../state/reportModel";
import ToolboxPanel from "./toolbox/ToolboxPanel";
import DataExplorerPanel from "./dataExplorerPanel/DataExplorerPanel";

const LeftPalette = ({
  onAddItem,
}: {
  onAddItem: (type: ReportItemType) => void;
}) => {
  return (
    <aside className="w-56 border-r bg-white flex flex-col">
      <ToolboxPanel onAddItem={onAddItem} />
      <div className="flex-1 overflow-hidden border-t border-slate-100">
        <DataExplorerPanel />
      </div>
    </aside>
  );
};

export default LeftPalette;
