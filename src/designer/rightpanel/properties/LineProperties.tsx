import { type ReportItemModel } from "../../state/reportModel";

const LineProperties = ({ item }: { item: ReportItemModel }) => {
  if (item.type !== "Line") return null;

  // Reserved for future:
  // - arrow heads
  // - line caps
  // - dash offset

  return null;
};

export default LineProperties;
