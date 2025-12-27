import ColorInput from "../controls/ColorInput";
import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../controls/Input";

const TableBodyProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Table") return null;

  const body = item.props?.body ?? {};

  return (
    <div className="space-y-3">
      <Input
        label="Font Size"
        value={String(body.fontSize ?? 12)}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              body: {
                ...body,
                fontSize: Number(v) || body.fontSize || 12,
              },
            },
          })
        }
      />

      <ColorInput
        label="Text Color"
        value={body.color ?? "#374151"}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              body: {
                ...body,
                color: v,
              },
            },
          })
        }
      />

      <ColorInput
        label="Background"
        value={body.backgroundColor ?? "transparent"}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              body: {
                ...body,
                backgroundColor: v,
              },
            },
          })
        }
      />
    </div>
  );
};

export default TableBodyProperties;
