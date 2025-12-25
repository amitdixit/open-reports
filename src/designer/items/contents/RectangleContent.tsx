import { type ReportItemModel } from "../../state/reportModel";

const RectangleContent = ({
  item,
  hasChildren,
}: {
  item: ReportItemModel;
  hasChildren?: boolean;
}) => {
  return (
    <div
      className={`w-full h-full pointer-events-none ${
        hasChildren
          ? "border-2 border-dashed border-blue-400 bg-blue-50/20"
          : "border border-dashed border-gray-400"
      }`}
      style={{ zIndex: 0 }}
    />
  );
};

export default RectangleContent;
