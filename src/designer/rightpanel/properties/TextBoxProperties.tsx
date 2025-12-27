import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../controls/Input";
import ColorInput from "../controls/ColorInput";
import SelectInput from "../controls/SelectInput";

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
        <SelectInput
          label="Font"
          value={props.fontFamily ?? "Arial"}
          options={[
            { label: "Arial", value: "Arial" },
            { label: "Times New Roman", value: "Times New Roman" },
            { label: "Courier New", value: "Courier New" },
            { label: "Georgia", value: "Georgia" },
            { label: "Verdana", value: "Verdana" },
          ]}
          onChange={(v) =>
            onCommit(item.id, {
              props: { ...props, fontFamily: v },
            })
          }
        />

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
        <ColorInput
          label="Color"
          value={props.color ?? "#000000"}
          onChange={(v) =>
            onCommit(item.id, {
              props: { ...props, color: v },
            })
          }
        />

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
        <SelectInput
          label="Align"
          value={props.textAlign ?? "left"}
          options={[
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ]}
          onChange={(v) =>
            onCommit(item.id, {
              props: {
                ...props,
                textAlign: v as "left" | "center" | "right",
              },
            })
          }
        />

        <SelectInput
          label="V Align"
          value={props.verticalAlign ?? "top"}
          options={[
            { label: "Top", value: "top" },
            { label: "Middle", value: "middle" },
            { label: "Bottom", value: "bottom" },
          ]}
          onChange={(v) =>
            onCommit(item.id, {
              props: {
                ...props,
                verticalAlign: v as "top" | "middle" | "bottom",
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default TextBoxProperties;
