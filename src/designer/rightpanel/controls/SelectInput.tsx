type Option = { label: string; value: string };

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
};

const SelectInput = ({ label, value, options, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-500 w-20">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 py-1 text-sm border rounded"
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
