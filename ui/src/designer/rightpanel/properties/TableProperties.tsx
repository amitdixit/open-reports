import { type ReportItemModel } from "../../state/reportModel";

const TableProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Table") return null;

  const props = item.props ?? {};

  return (
    <div>
      <h4 className="text-[10px] font-bold uppercase text-gray-400 border-b pb-1 mb-3">
        Table
      </h4>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-[10px] text-gray-500">Rows</span>
          <input
            type="number"
            value={props.rows ?? 3}
            onChange={(e) =>
              onCommit(item.id, {
                props: {
                  ...props,
                  rows: Math.max(1, Number(e.target.value) || 1),
                },
              })
            }
            className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-[10px] text-gray-500">Columns</span>
          <input
            type="number"
            value={props.columns ?? 3}
            onChange={(e) =>
              onCommit(item.id, {
                props: {
                  ...props,
                  columns: Math.max(1, Number(e.target.value) || 1),
                },
              })
            }
            className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
          />
        </label>
      </div>
    </div>
  );
};

export default TableProperties;
