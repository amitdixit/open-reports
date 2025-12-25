import { useEffect, useRef, useState } from "react";
import type { ReportItemModel } from "../../state/reportModel";

const TextBoxContent = ({
  item,
  isSelected,
  onTextCommit,
}: {
  item: ReportItemModel;
  isSelected: boolean;
  onTextCommit: (itemId: string, text: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.props?.text ?? "");
  const ref = useRef<HTMLDivElement>(null);
  const fontSize = item.props?.fontSize ?? 12;
  const color = item.props?.color ?? "#000000";
  const fontWeight = item.props?.fontWeight ?? "normal";
  const fontStyle = item.props?.fontStyle ?? "normal";
  const textDecoration = item.props?.textDecoration ?? "none";
  const textAlign = item.props?.textAlign ?? "left";
  const verticalAlign = item.props?.verticalAlign ?? "top";

  // Sync external updates (undo / redo)
  useEffect(() => {
    setValue(item.props?.text ?? "");
  }, [item.props?.text]);

  // Focus when editing
  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  return (
    <div
      ref={ref}
      contentEditable={editing}
      suppressContentEditableWarning
      className={`w-full h-full px-1 outline-none overflow-hidden flex flex-col ${
        editing ? "cursor-text" : "cursor-move"
      }`}
      style={{
        fontSize,
        color,
        fontWeight,
        fontStyle,
        textDecoration,
        textAlign,
        justifyContent:
          verticalAlign === "top"
            ? "flex-start"
            : verticalAlign === "middle"
              ? "center"
              : "flex-end",
      }}
      onDoubleClick={() => {
        if (isSelected) setEditing(true);
      }}
      onBlur={() => {
        setEditing(false);
        onTextCommit(item.id, value ?? "");
      }}
      onInput={(e) => setValue((e.target as HTMLDivElement).innerText)}
    >
      {/* ✅ Placeholder is VISUAL ONLY */}
      {editing ? value : value || <span className="text-gray-400">Text</span>}
    </div>
  );
};

export default TextBoxContent;
