import { type ReportItemModel } from "../../state/reportModel";

const ImageContent = ({ item }: { item: ReportItemModel }) => {
  const src = item.props?.src;
  const fit = item.props?.fit ?? "contain";
  const backgroundColor = item.props?.backgroundColor ?? "transparent";
  const borderColor = item.props?.borderColor ?? "#9ca3af";
  const borderWidth = item.props?.borderWidth ?? 1;
  const borderStyle = item.props?.borderStyle ?? "solid";

  const objectFit =
    fit === "stretch" ? "fill" : fit === "cover" ? "cover" : "contain";

  if (!src) {
    return (
      <div
        className="w-full h-full pointer-events-none overflow-hidden"
        style={{
          backgroundColor,
          borderColor,
          borderWidth,
          borderStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No Image
      </div>
    );
  }

  return (
    <img
      src={item.props?.src}
      alt=""
      className="max-w-full max-h-full"
      style={{
        objectFit,
        width: fit === "stretch" ? "100%" : "auto",
        height: fit === "stretch" ? "100%" : "auto",
      }}
    />
  );
};

export default ImageContent;
