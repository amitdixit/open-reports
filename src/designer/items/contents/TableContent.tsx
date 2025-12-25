const TableContent = () => {
  return (
    <div className="w-full h-full border border-gray-400 bg-white text-[10px] text-gray-600 grid grid-cols-3 grid-rows-3 pointer-events-none">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 flex items-center justify-center"
        >
          Cell
        </div>
      ))}
    </div>
  );
};

export default TableContent;
