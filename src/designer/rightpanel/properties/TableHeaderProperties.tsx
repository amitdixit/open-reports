import { Input } from "../InputPanel";
import ColorInput from "../controls/ColorInput";
import { type ReportItemModel } from "../../state/reportModel";

const TableHeaderProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Table") return null;

  const header = item.props?.header ?? {};

  return (
    <div className="space-y-3">
      <Input
        label="Font Size"
        value={String(header.fontSize ?? 12)}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              header: {
                ...header,
                fontSize: Number(v) || header.fontSize || 12,
              },
            },
          })
        }
      />

      <Input
        label="Font Family"
        value={header.fontFamily ?? "Arial"}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              header: {
                ...header,
                fontFamily: v,
              },
            },
          })
        }
      />

      <ColorInput
        label="Text Color"
        value={header.color ?? "#111827"}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              header: {
                ...header,
                color: v,
              },
            },
          })
        }
      />

      <ColorInput
        label="Background"
        value={header.backgroundColor ?? "#f3f4f6"}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              header: {
                ...header,
                backgroundColor: v,
              },
            },
          })
        }
      />
    </div>
  );
};

export default TableHeaderProperties;
