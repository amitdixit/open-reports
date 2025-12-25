import { type ReportItemModel } from "../../state/reportModel";

const ImageContent = ({ item }: { item: ReportItemModel }) => {
  const src = item.props?.src;
  const fit = item.props?.fit ?? "contain";

  if (!src) {
    return (
      <div
        className="
          w-full h-full
          flex items-center justify-center
          bg-gray-100
          text-gray-400
          text-xs
          italic
          pointer-events-none
          rounded-sm
        "
      >
        No Image
      </div>
    );
  }

  const objectFit = fit === "stretch" ? "fill" : fit;

  return (
    <img
      src={src}
      className="w-full h-full pointer-events-none"
      style={{ objectFit }}
      alt=""
    />
  );
};

export default ImageContent;
