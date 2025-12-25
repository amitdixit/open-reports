import { type ReportItemModel } from "../../state/reportModel";

const LineContent = ({ item }: { item: ReportItemModel }) => {
  const color = item.props?.color ?? "#4b5563";
  const strokeWidth = item.props?.width ?? 1;

  return (
    <div className="w-full h-full flex items-center pointer-events-none">
      <div
        className="w-full"
        style={{
          height: strokeWidth,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default LineContent;
