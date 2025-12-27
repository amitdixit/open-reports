import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../controls/Input";

const ImageProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Image") return null;
  //https://t3.ftcdn.net/jpg/03/83/46/48/360_F_383464809_VAyaM0bON9NZT1UCPXghp8GhHx56QKqm.jpg
  const src = item.props?.src ?? "";
  const fit = item.props?.fit ?? "contain";

  return (
    <div className="space-y-4">
      <Input
        label="Source"
        value={src}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              src: v,
            },
          })
        }
      />

      <div>
        <div className="text-xs font-medium text-gray-600 mb-1">Fit</div>
        <select
          className="w-full border rounded px-2 py-1 text-sm"
          value={fit}
          onChange={(e) =>
            onCommit(item.id, {
              props: {
                ...item.props,
                fit: e.target.value as "contain" | "cover" | "stretch",
              },
            })
          }
        >
          <option value="contain">Contain</option>
          <option value="cover">Cover</option>
          <option value="stretch">Stretch</option>
        </select>
      </div>
    </div>
  );
};

export default ImageProperties;
