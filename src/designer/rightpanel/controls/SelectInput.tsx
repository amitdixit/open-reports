type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
};

const SelectInput = ({ label, value, options, onChange }: Props) => {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
      {/* Label */}
      <label className="text-xs text-gray-500">{label}</label>

      {/* Select */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          px-2 py-1
          text-sm
          border rounded
        "
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
