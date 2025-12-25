type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

const ColorInput = ({ label, value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-500 w-20">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-10 border rounded"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 py-1 text-sm border rounded"
      />
    </div>
  );
};

export default ColorInput;
