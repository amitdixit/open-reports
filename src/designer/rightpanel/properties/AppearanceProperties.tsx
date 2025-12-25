import { type ReportItemModel } from "../../state/reportModel";
import ColorInput from "../controls/ColorInput";
import SelectInput from "../controls/SelectInput";
import { Input } from "../InputPanel";

const AppearanceProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  const props = item.props ?? {};

  const bg = props.backgroundColor ?? "#ffffff";
  const borderColor = props.borderColor ?? "#9ca3af";
  const borderWidth = String(props.borderWidth ?? 1);
  const borderStyle = props.borderStyle ?? "solid";

  return (
    <div className="space-y-3">
      <ColorInput
        label="Background"
        value={bg}
        onChange={(v) =>
          onCommit(item.id, {
            props: { ...props, backgroundColor: v },
          })
        }
      />

      <ColorInput
        label="Border"
        value={borderColor}
        onChange={(v) =>
          onCommit(item.id, {
            props: { ...props, borderColor: v },
          })
        }
      />

      <Input
        label="Border Width"
        value={borderWidth}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...props,
              borderWidth: Math.max(0, Number(v) || 0),
            },
          })
        }
      />

      <SelectInput
        label="Border Style"
        value={borderStyle}
        options={[
          { label: "Solid", value: "solid" },
          { label: "Dashed", value: "dashed" },
          { label: "Dotted", value: "dotted" },
        ]}
        onChange={(v) =>
          onCommit(item.id, {
            props: { ...props, borderStyle: v },
          })
        }
      />
    </div>
  );
};

export default AppearanceProperties;
