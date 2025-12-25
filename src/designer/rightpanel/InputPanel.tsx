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
    <label className="flex items-center justify-between gap-2">
      <span className="text-xs text-gray-500">{label}</span>
      <input
        className="w-full
                  px-2 py-1
                  text-sm
                  border border-gray-300
                  rounded-sm
                  focus:outline-none
                  focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </label>
  );
};
