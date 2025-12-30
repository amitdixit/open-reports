import { type ReportItemModel } from "../../state/reportModel";

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
      {/* Layout (Pixels) */}
      <div>
        <div className="text-[10px] font-semibold uppercase text-gray-400 mb-2">
          Layout (Pixels)
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Left */}
          <label className="block">
            <span className="text-[10px] text-gray-500">Left</span>
            <input
              type="number"
              value={local.x}
              onChange={(e) => setLocal({ ...local, x: e.target.value })}
              onBlur={commitGeometry}
              onKeyDown={onKeyDown}
              className="mt-1 block w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
            />
          </label>

          {/* Top */}
          <label className="block">
            <span className="text-[10px] text-gray-500">Top</span>
            <input
              type="number"
              value={local.y}
              onChange={(e) => setLocal({ ...local, y: e.target.value })}
              onBlur={commitGeometry}
              onKeyDown={onKeyDown}
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
            />
          </label>

          {/* Width */}
          <label className="block">
            <span className="text-[10px] text-gray-500">Width</span>
            <input
              type="number"
              value={local.width}
              onChange={(e) => setLocal({ ...local, width: e.target.value })}
              onBlur={commitGeometry}
              onKeyDown={onKeyDown}
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
            />
          </label>

          {/* Height */}
          <label className="block">
            <span className="text-[10px] text-gray-500">Height</span>
            <input
              type="number"
              value={local.height}
              onChange={(e) => setLocal({ ...local, height: e.target.value })}
              onBlur={commitGeometry}
              onKeyDown={onKeyDown}
              className="mt-1 w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CommonProperties;
