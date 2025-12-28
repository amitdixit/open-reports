import { type ReportItemModel } from "../../state/reportModel";

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
      <div>
        <h4 className="text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100 pb-1 mb-3">
          Fill
        </h4>

        <label className="block">
          <span className="text-[10px] text-gray-500">Background</span>
          <div className="mt-1 flex items-center gap-2">
            {/* Color swatch */}
            <input
              type="color"
              value={props.background ?? "#ffffff"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    backgroundColor: e.target.value,
                  },
                })
              }
              className="h-[28px] w-10 border border-gray-300 rounded-md p-0 cursor-pointer"
            />

            {/* Hex input */}
            <input
              type="text"
              value={props.backgroundColor ?? "#ffffff"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    background: e.target.value,
                  },
                })
              }
              className="w-28 px-3 py-1.5 text-xs border border-gray-300 rounded-md font-mono"
            />
          </div>
        </label>
      </div>

      {/* Border */}
      <div>
        <h4 className="text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100 pb-1 mb-3">
          Border
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {/* Border Color */}
          <label className="block">
            <span className="text-[10px] text-gray-500">Color</span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={props.borderColor ?? "#9ca3af"}
                onChange={(e) =>
                  onCommit(item.id, {
                    props: {
                      ...props,
                      borderColor: e.target.value,
                    },
                  })
                }
                className="h-[28px] w-10 border border-gray-300 rounded-md p-0 cursor-pointer"
              />
              <input
                type="text"
                value={props.borderColor ?? "#9ca3af"}
                onChange={(e) =>
                  onCommit(item.id, {
                    props: {
                      ...props,
                      borderColor: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md font-mono"
              />
            </div>
          </label>

          {/* Border Width */}
          <label className="block">
            <span className="text-[10px] text-gray-500">Width</span>
            <input
              type="number"
              value={props.borderWidth ?? 1}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    borderWidth: Number(e.target.value) || 1,
                  },
                })
              }
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
            />
          </label>

          {/* Border Style */}
          <label className="block col-span-2">
            <span className="text-[10px] text-gray-500">Style</span>
            <select
              value={props.borderStyle ?? "solid"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    borderStyle: e.target.value as
                      | "solid"
                      | "dashed"
                      | "dotted",
                  },
                })
              }
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md bg-white"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppearanceProperties;
