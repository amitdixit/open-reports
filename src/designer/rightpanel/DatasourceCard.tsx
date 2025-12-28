const DatasourceCard = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <div
      className="
        rounded-lg p-2
        flex flex-col items-center gap-1.5
        cursor-pointer
        bg-white
        hover:bg-slate-50
        transition
      "
    >
      <div className="text-slate-400">{icon}</div>
      <div className="text-[11px] text-center text-slate-600 leading-tight">
        {label}
      </div>
    </div>
  );
};
export default DatasourceCard;
