import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../InputPanel";

const TextBoxProperties = ({
  item,
  onCommit,
}: {
  item: ReportItemModel;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  if (item.type !== "TextBox") return null;

  const text = item.props?.text ?? "";

  return (
    <div className="space-y-4">
      <Input
        label="Text"
        value={text}
        onChange={(v) =>
          onCommit(item.id, {
            props: {
              ...item.props,
              text: v,
            },
          })
        }
      />
    </div>
  );
};

export default TextBoxProperties;
