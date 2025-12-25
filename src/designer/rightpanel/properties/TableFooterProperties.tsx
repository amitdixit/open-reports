import { type ReportItemModel } from "../../state/reportModel";

const TableFooterProperties = ({ item }: { item: ReportItemModel }) => {
  if (item.type !== "Table") return null;

  return (
    <div className="text-xs text-gray-400">
      Footer properties will be available in a future phase.
    </div>
  );
};

export default TableFooterProperties;
