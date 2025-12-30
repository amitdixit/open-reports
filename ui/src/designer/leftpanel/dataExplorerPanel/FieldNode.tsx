const FieldNode = ({ name, type }: { name: string; type: string }) => {
  return (
    <li className="flex items-center justify-between group cursor-pointer">
      <span className="text-xs text-slate-600 group-hover:text-indigo-600 font-medium">
        [{name}]
      </span>
      <span className="text-[10px] text-slate-300 uppercase">{type}</span>
    </li>
  );
};

export default FieldNode;
