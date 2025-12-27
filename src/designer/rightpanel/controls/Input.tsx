export const Input = ({
  label,
  value,
  onChange,
  onBlur,
  onKeyDown,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) => {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        className="
          w-full
          px-2 py-[2px]
          text-sm
          border border-gray-300
          rounded-sm
          focus:outline-none
          focus:border-blue-500
        "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
