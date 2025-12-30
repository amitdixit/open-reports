import { type ReportItemModel } from "../../state/reportModel";

const RectangleProperties = ({ item }: { item: ReportItemModel }) => {
  if (item.type !== "Rectangle") return null;

  // Reserved for future:
  // - corner radius
  // - shadow
  // - container-specific toggles

  return null;
};

export default RectangleProperties;
