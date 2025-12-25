import { type ReportItemModel } from "../../state/reportModel";

const RectangleContent = ({
  item,
  hasChildren,
}: {
  item: ReportItemModel;
  hasChildren?: boolean;
}) => {
  const fill = item.props?.fillColor ?? "transparent";
  const borderColor = item.props?.borderColor ?? "#9ca3af";
  const borderWidth = item.props?.borderWidth ?? 1;
  return (
    <div
      className={`w-full h-full pointer-events-none rounded-sm ${
        hasChildren
          ? "border-2 border-dashed border-blue-400 bg-blue-50/20"
          : "border border-dashed border-gray-400"
      }`}
      style={{
        zIndex: 0,
        backgroundColor: fill,
        borderStyle: hasChildren ? "dashed" : "solid",
        borderColor,
        borderWidth,
      }}
    />
  );
};

export default RectangleContent;
