import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../controls/Input";

const TableProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Table") return null;

  const rows = String(item.props?.rows ?? 3);
  const columns = String(item.props?.columns ?? 3);

  return (
    <div className="space-y-4">
      <Input
        label="Rows"
        value={rows}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              rows: Math.max(1, Number(v) || 1),
            },
          })
        }
      />

      <Input
        label="Columns"
        value={columns}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              columns: Math.max(1, Number(v) || 1),
            },
          })
        }
      />
    </div>
  );
};

export default TableProperties;
