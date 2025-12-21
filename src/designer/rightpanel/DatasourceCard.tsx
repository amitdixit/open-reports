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
                border rounded-md p-3
                flex flex-col items-center gap-2
                cursor-pointer
                hover:border-blue-500 hover:bg-blue-50
                transition
            "
        >
            <div className="text-blue-600">{icon}</div>
            <div className="text-xs text-center text-gray-700">
                {label}
            </div>
        </div>
    );
};
export default DatasourceCard;