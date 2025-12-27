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
      {/* Text */}
      <Input
        label="Text"
        value={props.text ?? ""}
        onChange={(v) =>
          onCommit(item.id, {
            props: { ...props, text: v },
          })
        }
      />

      {/* Typography */}
      <div className="space-y-3">
        {/* Font */}
        <div className="grid grid-cols-[80px_1fr] items-center gap-2">
          <label className="text-xs text-gray-500">Font</label>
          <select
            className="px-2 py-1 text-sm border rounded"
            value={props.fontFamily ?? "Arial"}
            onChange={(e) =>
              onCommit(item.id, {
                props: { ...props, fontFamily: e.target.value },
              })
            }
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>

        {/* Size */}
        <div className="grid grid-cols-[80px_1fr] items-center gap-2">
          <label className="text-xs text-gray-500">Size</label>
          <input
            type="number"
            className="w-24 px-2 py-1 text-sm border rounded"
            value={props.fontSize ?? 18}
            onChange={(e) =>
              onCommit(item.id, {
                props: {
                  ...props,
                  fontSize: Number(e.target.value) || 18,
                },
              })
            }
          />
        </div>

        {/* Color */}
        <div className="grid grid-cols-[80px_1fr] items-center gap-2">
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

        {/* Style */}
        <div className="grid grid-cols-[80px_1fr] items-center gap-2">
          <label className="text-xs text-gray-500">Style</label>
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1">
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

            <label className="flex items-center gap-1">
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

            <label className="flex items-center gap-1">
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
      </div>

      {/* Alignment */}
      <div className="pt-3 border-t space-y-2">
        <div className="grid grid-cols-[80px_1fr] items-center gap-2">
          <label className="text-xs text-gray-500">Align</label>
          <select
            className="px-2 py-1 text-sm border rounded"
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

        <div className="grid grid-cols-[80px_1fr] items-center gap-2">
          <label className="text-xs text-gray-500">V Align</label>
          <select
            className="px-2 py-1 text-sm border rounded"
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
    </div>
  );
};

export default TextBoxProperties;
