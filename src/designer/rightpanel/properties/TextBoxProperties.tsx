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

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={props.fontWeight === "bold"}
            onChange={(e) =>
              onCommit(item.id, {
                props: {
                  ...props,
                  fontWeight: e.target.checked ? "bold" : "normal",
                },
              })
            }
          />
          Bold
        </label>

        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={props.fontStyle === "italic"}
            onChange={(e) =>
              onCommit(item.id, {
                props: {
                  ...props,
                  fontStyle: e.target.checked ? "italic" : "normal",
                },
              })
            }
          />
          Italic
        </label>

        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={props.textDecoration === "underline"}
            onChange={(e) =>
              onCommit(item.id, {
                props: {
                  ...props,
                  textDecoration: e.target.checked ? "underline" : "none",
                },
              })
            }
          />
          Underline
        </label>
      </div>
    </div>
  );
};

export default TextBoxProperties;
