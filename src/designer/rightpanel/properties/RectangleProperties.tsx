import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../InputPanel";

const RectangleProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "Rectangle") return null;

  const fillColor = item.props?.fillColor ?? "#ffffff";
  const borderColor = item.props?.borderColor ?? "#9ca3af"; // gray-400
  const borderWidth = String(item.props?.borderWidth ?? 1);

  return (
    <div className="space-y-3">
      <Input
        label="Fill"
        value={fillColor}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              fillColor: v,
            },
          })
        }
      />

      <Input
        label="Border"
        value={borderColor}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              borderColor: v,
            },
          })
        }
      />

      <Input
        label="Border Width"
        value={borderWidth}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              borderWidth: Number(v) || 0,
            },
          })
        }
      />
    </div>
  );
};

export default RectangleProperties;
