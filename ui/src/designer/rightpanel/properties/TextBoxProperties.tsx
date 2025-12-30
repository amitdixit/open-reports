import { type ReportItemModel } from "../../state/reportModel";

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
      <label className="block">
        <span className="text-[10px] font-bold uppercase text-gray-400">
          Text
        </span>
        <input
          type="text"
          value={props.text ?? ""}
          onChange={(e) =>
            onCommit(item.id, { props: { ...props, text: e.target.value } })
          }
          className="mt-1 block w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
        />
      </label>

      {/* Typography */}
      <div>
        <h4 className="text-[10px] font-bold uppercase text-gray-400 border-b pb-1 mb-3">
          Typography
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {/* Font */}
          <label className="block col-span-2">
            <span className="text-[10px] text-gray-500">Font</span>
            <select
              value={props.fontFamily ?? "Arial"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: { ...props, fontFamily: e.target.value },
                })
              }
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md bg-white"
            >
              <option>Arial</option>
              <option>Times New Roman</option>
              <option>Courier New</option>
              <option>Georgia</option>
              <option>Verdana</option>
            </select>
          </label>

          {/* Size */}
          <label className="block">
            <span className="text-[10px] text-gray-500">Size</span>
            <input
              type="number"
              value={props.fontSize ?? 18}
              onChange={(e) =>
                onCommit(item.id, {
                  props: { ...props, fontSize: Number(e.target.value) || 18 },
                })
              }
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
            />
          </label>

          {/* Color */}
          <label className="block">
            <span className="text-[10px] text-gray-500">Color</span>
            <input
              type="color"
              value={props.color ?? "#000000"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: { ...props, color: e.target.value },
                })
              }
              className="mt-1 h-[28px] w-full border border-gray-300 rounded-md p-0"
            />
          </label>
        </div>

        {/* Style */}
        <div className="mt-3">
          <span className="text-[10px] text-gray-500">Style</span>
          <div className="mt-2 flex gap-4 text-xs">
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
      <div>
        <h4 className="text-[10px] font-bold uppercase text-gray-400 border-b pb-1 mb-3">
          Alignment
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[10px] text-gray-500">Align</span>
            <select
              value={props.textAlign ?? "left"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: { ...props, textAlign: e.target.value },
                })
              }
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md bg-white"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>

          <label className="block">
            <span className="text-[10px] text-gray-500">Vertical</span>
            <select
              value={props.verticalAlign ?? "top"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: { ...props, verticalAlign: e.target.value },
                })
              }
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md bg-white"
            >
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="bottom">Bottom</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TextBoxProperties;
