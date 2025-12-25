import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../InputPanel";
import ColorInput from "../controls/ColorInput";

const TextBoxProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "TextBox") return null;

  const props = item.props ?? {};

  return (
    <div className="space-y-4">
      <Input
        label="Text"
        value={props.text ?? ""}
        onChange={(v) =>
          onCommit(item.id, {
            props: { ...props, text: v },
          })
        }
      />

      {/* Font Size */}
      <Input
        label="Font Size"
        value={String(props.fontSize ?? 18)}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...props,
              fontSize: Number(v) || props.fontSize || 18,
            },
          })
        }
      />

      {/* Font Color */}
      <ColorInput
        label="Color"
        value={props.color ?? "#000000"}
        onChange={(v) =>
          onCommit(item.id, {
            props: { ...props, color: v },
          })
        }
      />
    </div>
  );
};

export default TextBoxProperties;
