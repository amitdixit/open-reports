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
            <span className="text-gray-600 w-16">{label}</span>
            <input
                className="w-24 border rounded px-2 py-1 text-right font-mono"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />
        </label>
    );
};