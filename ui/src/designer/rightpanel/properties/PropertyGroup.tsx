import { useState, type ReactNode } from "react";

type Props = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

const PropertyGroup = ({ title, defaultOpen = false, children }: Props) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b last:border-b-0">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          w-full flex items-center justify-between
          px-3 py-1.5
          text-[10px] font-semibold tracking-widest uppercase
          text-gray-600
          hover:bg-gray-50
          select-none
        "
      >
        <span>{title}</span>
        <span
          className={`
            text-gray-400 text-[10px]
            transition-transform duration-150
            ${open ? "rotate-90" : ""}
          `}
        >
          ▶
        </span>
      </button>

      {/* Content */}
      {open && (
        <div
          className="
            px-3 py-2
            space-y-2
            bg-gray-50
          "
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default PropertyGroup;
