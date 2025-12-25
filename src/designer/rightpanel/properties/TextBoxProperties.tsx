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
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 w-20">Align</label>
        <select
          className="flex-1 px-2 py-1 text-sm border rounded"
          value={props.textAlign ?? "left"}
          onChange={(e) =>
            onCommit(item.id, {
              props: {
                ...props,
                textAlign: e.target.value as "left" | "center" | "right",
              },
            })
          }
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 w-20">V Align</label>
        <select
          className="flex-1 px-2 py-1 text-sm border rounded"
          value={props.verticalAlign ?? "top"}
          onChange={(e) =>
            onCommit(item.id, {
              props: {
                ...props,
                verticalAlign: e.target.value as "top" | "middle" | "bottom",
              },
            })
          }
        >
          <option value="top">Top</option>
          <option value="middle">Middle</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>
    </div>
  );
};

export default TextBoxProperties;
