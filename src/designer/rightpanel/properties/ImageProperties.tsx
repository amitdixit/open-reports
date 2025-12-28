import { type ReportItemModel } from "../../state/reportModel";

const ImageProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Image") return null;

  const props = item.props ?? {};

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-[10px] text-gray-500">Source</span>
        <input
          type="text"
          value={props.src ?? ""}
          onChange={(e) =>
            onCommit(item.id, {
              props: {
                ...props,
                src: e.target.value,
              },
            })
          }
          className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
        />
        <div className="mt-1 text-[11px] text-gray-400">
          Paste image URL or bind at runtime
        </div>
      </label>

      <div>
        <h4 className="text-[10px] font-bold uppercase text-gray-400 border-b pb-1 mb-3">
          Fit
        </h4>

        <label className="block">
          <span className="text-[10px] text-gray-500">Mode</span>
          <select
            value={props.fit ?? "contain"}
            onChange={(e) =>
              onCommit(item.id, {
                props: { ...props, fit: e.target.value },
              })
            }
            className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md bg-white"
          >
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
            <option value="stretch">Stretch</option>
          </select>
        </label>

        <div className="mt-2 text-[11px] text-gray-400 space-y-0.5">
          <div>Contain: keep aspect ratio, may leave empty space</div>
          <div>Cover: fill box, may crop image</div>
          <div>Stretch: ignore aspect ratio</div>
        </div>
      </div>
    </div>
  );
};

export default ImageProperties;
