import { type ReportItemModel } from "../../state/reportModel";

const TableContent = ({ item }: { item: ReportItemModel }) => {
  const rows = item.props?.rows ?? 3;
  const columns = item.props?.columns ?? 3;
  const backgroundColor = item.props?.backgroundColor ?? "transparent";
  const borderColor = item.props?.borderColor ?? "#9ca3af";
  const borderWidth = item.props?.borderWidth ?? 1;
  const borderStyle = item.props?.borderStyle ?? "solid";
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
        backgroundColor,
        borderColor,
        borderWidth,
        borderStyle,
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: columns }).map((_, colIndex) => {
          const isLastRow = rowIndex === rows - 1;
          const isLastColumn = colIndex === columns - 1;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center text-xs text-gray-600"
              style={{
                padding: "4px 6px",
                borderRight: isLastColumn ? "none" : "1px solid #e5e7eb",
                borderBottom: isLastRow ? "none" : "1px solid #e5e7eb",
              }}
            >
              Cell
            </div>
          );
        }),
      )}
    </div>
  );
};

export default TableContent;
