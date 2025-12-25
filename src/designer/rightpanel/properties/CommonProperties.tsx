import { type ReportItemModel } from "../../state/reportModel";
import { Input } from "../InputPanel";

const GRID_SIZE = 8;
const MIN_WIDTH = 24;
const MIN_HEIGHT = 16;

const snap = (v: number) => Math.round(v / GRID_SIZE) * GRID_SIZE;

const CommonProperties = ({
  item,
  local,
  setLocal,
  onCommit,
  onKeyDown,
}: {
  item: ReportItemModel;
  local: {
    x: string;
    y: string;
    width: string;
    height: string;
  };
  setLocal: (v: any) => void;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) => {
  const commitGeometry = () => {
    const x = snap(Number(local.x));
    const y = snap(Number(local.y));
    const width = Math.max(snap(Number(local.width)), MIN_WIDTH);
    const height = Math.max(snap(Number(local.height)), MIN_HEIGHT);

    onCommit(item.id, { x, y, width, height });
  };

  return (
    <div className="space-y-3">
      <Input
        label="Name"
        value={item.name ?? ""}
        onChange={(v) => onCommit(item.id, { name: v })}
      />

      <Input
        label="X"
        value={local.x}
        onChange={(v) => setLocal({ ...local, x: v })}
        onBlur={commitGeometry}
        onKeyDown={onKeyDown}
      />

      <Input
        label="Y"
        value={local.y}
        onChange={(v) => setLocal({ ...local, y: v })}
        onBlur={commitGeometry}
        onKeyDown={onKeyDown}
      />

      <Input
        label="Width"
        value={local.width}
        onChange={(v) => setLocal({ ...local, width: v })}
        onBlur={commitGeometry}
        onKeyDown={onKeyDown}
      />

      <Input
        label="Height"
        value={local.height}
        onChange={(v) => setLocal({ ...local, height: v })}
        onBlur={commitGeometry}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default CommonProperties;
