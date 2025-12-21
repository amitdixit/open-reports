export const Tab = ({
    label,
    active,
    onClick,
}: {
    label: string;
    active?: boolean;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-2 text-sm cursor-pointer border-b-2 ${active
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
        >
            {label}
        </div>
    );
};