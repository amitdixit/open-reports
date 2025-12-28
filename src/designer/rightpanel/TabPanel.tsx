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
      className={`px-3 py-2 text-xs cursor-pointer border-b ${
        active
          ? "border-blue-600 text-blue-600 font-medium"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </div>
  );
};
