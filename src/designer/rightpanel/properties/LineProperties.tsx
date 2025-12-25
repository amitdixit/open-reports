import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../InputPanel";

const LineProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Line") return null;

  const color = item.props?.color ?? "#4b5563"; // gray-600
  const width = String(item.props?.width ?? 1);

  return (
    <div className="space-y-4">
      <Input
        label="Color"
        value={color}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              color: v,
            },
          })
        }
      />

      <Input
        label="Stroke W"
        value={width}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              width: Math.max(1, Number(v) || 1),
            },
          })
        }
      />
    </div>
  );
};

export default LineProperties;
