import { type ReportItemModel } from "../../state/reportModel";
import ColorInput from "../controls/ColorInput";
import { Input } from "../controls/Input";
import SelectInput from "../controls/SelectInput";

const AppearanceProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  const props = item.props ?? {};

  return (
    <div className="space-y-4">
      {/* Fill */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-600">Fill</div>

        <ColorInput
          label="Background"
          value={props.background ?? "#ffffff"}
          onChange={(v) =>
            onCommit(item.id, {
              props: { ...props, background: v },
            })
          }
        />
      </div>

      {/* Stroke */}
      <div className="pt-3 border-t space-y-3">
        <div className="text-xs font-medium text-gray-600">Border</div>

        <ColorInput
          label="Color"
          value={props.borderColor ?? "#9ca3af"}
          onChange={(v) =>
            onCommit(item.id, {
              props: { ...props, borderColor: v },
            })
          }
        />

        <Input
          label="Width"
          value={String(props.borderWidth ?? 1)}
          onChange={(v) =>
            onCommit(item.id, {
              props: {
                ...props,
                borderWidth: Number(v) || 1,
              },
            })
          }
        />

        <SelectInput
          label="Style"
          value={props.borderStyle ?? "solid"}
          options={[
            { label: "Solid", value: "solid" },
            { label: "Dashed", value: "dashed" },
            { label: "Dotted", value: "dotted" },
          ]}
          onChange={(v) =>
            onCommit(item.id, {
              props: {
                ...props,
                borderStyle: v as "solid" | "dashed" | "dotted",
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default AppearanceProperties;
