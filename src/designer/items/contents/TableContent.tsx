import { type ReportItemModel } from "../../state/reportModel";

const TableContent = ({ item }: { item: ReportItemModel }) => {
  const rows = item.props?.rows ?? 3;
  const columns = item.props?.columns ?? 3;
  const borderColor = item.props?.borderColor ?? "#9ca3af";
  const borderWidth = item.props?.borderWidth ?? 1;
  const borderStyle = item.props?.borderStyle ?? "solid";
  const headerProps = item.props?.header ?? {};
  const bodyProps = item.props?.body ?? {};
  const headerStyle = {
    backgroundColor: headerProps.backgroundColor ?? "#f3f4f6",
    fontFamily: headerProps.fontFamily ?? "Arial",
    fontSize: headerProps.fontSize ?? 12,
    color: headerProps.color ?? "#111827",
    fontWeight: headerProps.fontWeight ?? 600,
  };

  const bodyStyle = {
    backgroundColor: bodyProps.backgroundColor ?? "transparent",
    fontFamily: bodyProps.fontFamily ?? "Arial",
    fontSize: bodyProps.fontSize ?? 12,
    color: bodyProps.color ?? "#374151",
    fontWeight: 400,
  };

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
        backgroundColor: "transparent",
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
          const isHeader = rowIndex === 0;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center text-xs"
              style={{
                padding: "4px 6px",
                borderRight: isLastColumn ? "none" : "1px solid #e5e7eb",
                borderBottom: isLastRow ? "none" : "1px solid #e5e7eb",
                ...(isHeader ? headerStyle : bodyStyle),
              }}
            >
              {isHeader ? "Header" : "Cell"}
            </div>
          );
        }),
      )}
    </div>
  );
};

export default TableContent;
