import type { ReportItemType } from "../../state/reportModel";
import BasicItemsSection from "./BasicItemsSection";
import ChartsSection from "./ChartsSection";

const ToolboxPanel = ({
  onAddItem,
}: {
  onAddItem: (type: ReportItemType) => void;
}) => {
  return (
    <div className="shrink-0">
      <BasicItemsSection onAddItem={onAddItem} />
      <ChartsSection onAddItem={onAddItem} />
    </div>
  );
};

export default ToolboxPanel;
