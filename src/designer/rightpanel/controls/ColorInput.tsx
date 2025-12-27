type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

const ColorInput = ({ label, value, onChange }: Props) => {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
      {/* Label */}
      <label className="text-xs text-gray-500">{label}</label>

      {/* Control */}
      <div className="flex items-center gap-2 overflow-hidden">
        {/* Color swatch */}
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-8 w-10
            border rounded
            cursor-pointer
            p-0
            shrink-0
          "
        />

        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-28
            px-2 py-[2px]
            text-sm
            border rounded-sm
            font-mono
          "
        />
      </div>
    </div>
  );
};

export default ColorInput;
