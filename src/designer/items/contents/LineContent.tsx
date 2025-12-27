import { type ReportItemModel } from "../../state/reportModel";

const LineContent = ({ item }: { item: ReportItemModel }) => {
  const color = item.props?.borderColor ?? "#4b5563";
  const borderWidth = item.props?.borderWidth ?? 1;

  return (
    <div className="w-full h-full flex items-center pointer-events-none">
      <div
        className="w-full rounded-full"
        style={{
          height: 0,
          backgroundColor: "transparent",
          borderTopWidth: borderWidth,
          borderTopColor: color,
          borderTopStyle: item.props?.borderStyle ?? "solid",
        }}
      />
    </div>
  );
};

export default LineContent;
