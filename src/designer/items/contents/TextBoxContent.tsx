import { useEffect, useRef, useState } from "react";
import type { ReportItemModel } from "../state/reportModel";

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
    const [value, setValue] = useState(item.text ?? "");
    const ref = useRef<HTMLDivElement>(null);

    // Sync external updates (undo / redo)
    useEffect(() => {
        setValue(item.text ?? "");
    }, [item.text]);

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
            className={`w-full h-full px-1 outline-none ${editing ? "cursor-text" : "cursor-move"
                }`}
            onDoubleClick={() => {
                if (isSelected) setEditing(true);
            }}
            onBlur={() => {
                setEditing(false);
                onTextCommit(item.id, value);
            }}
            onInput={(e) =>
                setValue((e.target as HTMLDivElement).innerText)
            }
        >
            {value || (editing ? "" : "Text")}
        </div>
    );
};

export default TextBoxContent;
