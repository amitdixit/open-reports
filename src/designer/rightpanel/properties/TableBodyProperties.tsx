import { type ReportItemModel } from "../../state/reportModel";

const TableBodyProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Table") return null;

  const props = item.props ?? {};
  const body = props.body ?? {};

  return (
    <div>
      <h4 className="text-[10px] font-bold uppercase text-gray-400 border-b pb-1 mb-3">
        Body
      </h4>

      <div className="space-y-3">
        {/* Font Size */}
        <label className="block">
          <span className="text-[10px] text-gray-500">Font Size</span>
          <input
            type="number"
            value={body.fontSize ?? 12}
            onChange={(e) =>
              onCommit(item.id, {
                props: {
                  ...props,
                  body: {
                    ...body,
                    fontSize: Number(e.target.value) || 12,
                  },
                },
              })
            }
            className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
          />
        </label>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[10px] text-gray-500">Text Color</span>
            <input
              type="color"
              value={body.color ?? "#374151"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    body: { ...body, color: e.target.value },
                  },
                })
              }
              className="mt-1 h-[28px] w-full border border-gray-300 rounded-md p-0"
            />
          </label>

          <label className="block">
            <span className="text-[10px] text-gray-500">Background</span>
            <input
              type="color"
              value={body.backgroundColor ?? "transparent"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    body: {
                      ...body,
                      backgroundColor: e.target.value,
                    },
                  },
                })
              }
              className="mt-1 h-[28px] w-full border border-gray-300 rounded-md p-0"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default TableBodyProperties;
