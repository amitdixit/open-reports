import { useState } from "react";
import { Icons } from "../../icons/icons";

const DatasetNode = ({
  name,
  isParameter,
  children,
}: {
  name: string;
  isParameter?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(!isParameter);

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
      >
        <span className="w-3 text-slate-400">{open ? "▾" : "▸"}</span>

        {isParameter ? (
          <div className="w-4 h-4 flex items-center justify-center font-bold text-[10px] bg-slate-200 rounded">
            P
          </div>
        ) : (
          <Icons.Database2 className="w-4 h-4 text-slate-500" />
        )}

        <span>{name}</span>
      </button>

      {open && <ul className="pl-6 space-y-1">{children}</ul>}
    </div>
  );
};

export default DatasetNode;
