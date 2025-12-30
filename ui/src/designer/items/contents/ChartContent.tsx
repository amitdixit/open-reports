const ChartContent = ({ label }: { label?: string }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-600 text-xs pointer-events-none">
      <div className="w-6 h-6 border border-gray-400 mb-1" />
      {label ?? "Chart"}
    </div>
  );
};

export default ChartContent;
