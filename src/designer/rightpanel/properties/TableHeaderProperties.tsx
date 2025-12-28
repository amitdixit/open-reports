import { type ReportItemModel } from "../../state/reportModel";

const TableHeaderProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Table") return null;

  const props = item.props ?? {};
  const header = props.header ?? {};

  return (
    <div>
      <h4 className="text-[10px] font-bold uppercase text-gray-400 border-b pb-1 mb-3">
        Header
      </h4>

      <div className="space-y-3">
        {/* Font */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[10px] text-gray-500">Font Size</span>
            <input
              type="number"
              value={header.fontSize ?? 12}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    header: {
                      ...header,
                      fontSize: Number(e.target.value) || 12,
                    },
                  },
                })
              }
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-[10px] text-gray-500">Font Family</span>
            <input
              type="text"
              value={header.fontFamily ?? "Arial"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    header: {
                      ...header,
                      fontFamily: e.target.value,
                    },
                  },
                })
              }
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
            />
          </label>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[10px] text-gray-500">Text Color</span>
            <input
              type="color"
              value={header.color ?? "#111827"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    header: { ...header, color: e.target.value },
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
              value={header.backgroundColor ?? "#f3f4f6"}
              onChange={(e) =>
                onCommit(item.id, {
                  props: {
                    ...props,
                    header: {
                      ...header,
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

export default TableHeaderProperties;
