export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <div className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
      {title}
    </div>
    <div className="p-4 grid grid-cols-2 gap-2">{children}</div>
  </>
);

export const PaletteItem = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="
        flex flex-col items-center justify-center
        p-3
        border border-slate-100
        rounded-xl
        cursor-pointer
        bg-white
        transition-colors
        hover:bg-indigo-50
        hover:border-indigo-200
        group
      "
    >
      <span className="text-slate-500 group-hover:text-indigo-600 transition-colors">
        {icon}
      </span>
      <span className="mt-1.5 text-[10px] font-medium text-slate-500 group-hover:text-indigo-600">
        {label}
      </span>
    </div>
  );
};
