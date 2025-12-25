import { type ReportItemModel } from "../../state/reportModel";

const TableContent = ({ item }: { item: ReportItemModel }) => {
  const rows = item.props?.rows ?? 3;
  const columns = item.props?.columns ?? 3;

  return (
    <div
      className="
        w-full h-full
        bg-white
        text-[10px] text-gray-600
        grid
        pointer-events-none
        rounded-sm
        overflow-hidden
      "
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        border: "1px solid #d1d5db",
      }}
    >
      {Array.from({ length: rows * columns }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 flex items-center justify-center"
        >
          Cell
        </div>
      ))}
    </div>
  );
};

export default TableContent;
