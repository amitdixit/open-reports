import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../controls/Input";
import SelectInput from "../controls/SelectInput";

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
      <div className="text-xs text-gray-400 ml-20">
        Paste image URL or bind at runtime
      </div>

      <div>
        <div className="text-xs font-medium text-gray-600 mb-1">Fit</div>
        <SelectInput
          label="Fit"
          value={item.props.fit ?? "contain"}
          options={[
            { label: "Contain", value: "contain" },
            { label: "Cover", value: "cover" },
            { label: "Stretch", value: "stretch" },
          ]}
          onChange={(v) =>
            onCommit(item.id, {
              props: { ...item.props, fit: v },
            })
          }
        />
        <div className="text-xs text-gray-400 ml-20 space-y-0.5">
          <div>Contain: keep aspect ratio, may leave empty space</div>
          <div>Cover: fill box, may crop image</div>
          <div>Stretch: ignore aspect ratio</div>
        </div>
      </div>
    </div>
  );
};

export default ImageProperties;
