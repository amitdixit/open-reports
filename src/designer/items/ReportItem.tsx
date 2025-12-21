import React, { useRef } from "react";
import { type ReportItemModel } from "../state/reportModel";
import TextBoxContent from "./TextBoxContent";

type ResizeDir = "nw" | "ne" | "sw" | "se";

/**
 * ReportItem
 * ----------------
 * Phase 8.1 – Resize interaction (preview-only).
 */
const DRAG_THRESHOLD = 3;

const ReportItem = ({
    item,
    isSelected,
    isGroupResizing,
    onSelect,
    onDrag,
    onResize,
    onDragStart,
    onDragCancel,
    onGroupResizeStart,
    onItemTextCommit
}: {
    item: ReportItemModel;
    isSelected: boolean;
    isGroupResizing?: boolean;
    onSelect: (itemId: string, e: React.MouseEvent) => void;
    onDrag: (itemId: string, x: number, y: number, isFinal: boolean) => void;
    onResize: (
        itemId: string,
        dx: number,
        dy: number,
        dir: ResizeDir,
        isFinal: boolean
    ) => void;
    onDragStart?: (itemId: string) => void;
    onDragCancel?: () => void;
    onGroupResizeStart?: (itemId: string, dir: ResizeDir) => void;
    onItemTextCommit: (itemId: string, text: string) => void;
}) => {
    // const dragStartRef = useRef<{ x: number; y: number } | null>(null);
    const dragStartRef = useRef<{
        mouseX: number;
        mouseY: number;
        started: boolean;
    } | null>(null);



    const resizeStartRef = useRef<{
        dir: ResizeDir;
        mouseX: number;
        mouseY: number;
        x: number;
        y: number;
        width: number;
        height: number;
    } | null>(null);

    /* ---------------- Drag (already implemented) ---------------- */



    const onMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();

        const isMultiModifier = e.ctrlKey || e.metaKey || e.shiftKey;

        if (!isSelected || isMultiModifier) {
            onSelect(item.id, e);
        }

        dragStartRef.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            started: false,
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("blur", onWindowBlur);

    };

    const onWindowBlur = (_e: FocusEvent) => {
        cleanupDrag();
    };

    const cleanupDrag = () => {
        dragStartRef.current = null;

        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("blur", onWindowBlur);
        onDragCancel?.();
        document.body.style.cursor = "";
    };



    const onMouseMove = (e: MouseEvent) => {
        if (!dragStartRef.current) return;

        const dx = e.clientX - dragStartRef.current.mouseX;
        const dy = e.clientY - dragStartRef.current.mouseY;

        // ⛔ Not a drag yet
        if (
            !dragStartRef.current.started &&
            Math.abs(dx) < DRAG_THRESHOLD &&
            Math.abs(dy) < DRAG_THRESHOLD
        ) {
            return;
        }

        // 🔒 Start drag ONCE
        // if (!dragStartRef.current.started) {
        //     dragStartRef.current.started = true;
        //     onDragStart?.(item.id);
        // }

        if (!dragStartRef.current.started) {
            dragStartRef.current.started = true;

            // 🔒 Arm snapshot first
            onDragStart?.(item.id);

            // ⛔ DO NOT process drag on the same mousemove
            return;
        }

        onDrag(item.id, dx, dy, false);
    };

    const onMouseUp = (e: MouseEvent) => {
        if (!dragStartRef.current) return;

        const dx = e.clientX - dragStartRef.current.mouseX;
        const dy = e.clientY - dragStartRef.current.mouseY;

        if (dragStartRef.current.started) {
            onDrag(item.id, dx, dy, true);

        }

        cleanupDrag();
    };


    /* ---------------- Resize (NEW – preview only) ---------------- */

    const onResizeMouseDown = (
        e: React.MouseEvent,
        dir: ResizeDir
    ) => {
        e.stopPropagation();
        const isMultiModifier = e.ctrlKey || e.metaKey || e.shiftKey;

        // 🔒 DO NOT change selection if item is already selected
        if (!isSelected || isMultiModifier) {
            onSelect(item.id, e);
        } onGroupResizeStart?.(item.id, dir);
        console.log("Resize mouse down", item.id, dir);
        resizeStartRef.current = {
            dir,
            mouseX: e.clientX,
            mouseY: e.clientY,
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
        };

        document.body.style.cursor =
            dir === "nw" || dir === "se" ? "nwse-resize" : "nesw-resize";

        window.addEventListener("mousemove", onResizeMouseMove);
        window.addEventListener("mouseup", onResizeMouseUp);
    };

    const onResizeMouseMove = (e: MouseEvent) => {
        if (!resizeStartRef.current) return;

        const s = resizeStartRef.current;

        const dx = e.clientX - s.mouseX;
        const dy = e.clientY - s.mouseY;

        onResize(item.id, dx, dy, s.dir, false);
    };

    const onResizeMouseUp = (e: MouseEvent) => {
        if (!resizeStartRef.current) return;

        const s = resizeStartRef.current;

        const dx = e.clientX - s.mouseX;
        const dy = e.clientY - s.mouseY;

        onResize(item.id, dx, dy, s.dir, true);

        resizeStartRef.current = null;
        window.removeEventListener("mousemove", onResizeMouseMove);
        window.removeEventListener("mouseup", onResizeMouseUp);
    };
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            cleanupDrag();
        }
    };



    return (
        <div
            onMouseDown={onMouseDown}
            className={
                "absolute text-xs flex items-center justify-center select-none  cursor-move " +
                (isSelected
                    ? "border-2 border-blue-600 bg-blue-50"
                    : "border border-gray-400 bg-white")
            }
            style={{
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.height,
            }}
        >
            {/* {item.type} */}
            {item.type === "TextBox" && (
                <TextBoxContent
                    item={item}
                    isSelected={isSelected}
                    onTextCommit={onItemTextCommit}
                />
            )}

            {/* Resize handles */}
            {isSelected && !isGroupResizing && (
                <>
                    <Handle dir="nw" onMouseDown={onResizeMouseDown} />
                    <Handle dir="ne" onMouseDown={onResizeMouseDown} />
                    <Handle dir="sw" onMouseDown={onResizeMouseDown} />
                    <Handle dir="se" onMouseDown={onResizeMouseDown} />
                </>
            )}
        </div>
    );
};

const Handle = ({
    dir,
    onMouseDown,
}: {
    dir: ResizeDir;
    onMouseDown: (e: React.MouseEvent, dir: ResizeDir) => void;
}) => {
    const pos: Record<ResizeDir, string> = {
        nw: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize",
        ne: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize",
        sw: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize",
        se: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize",
    };

    return (
        <div
            onMouseDown={(e) => onMouseDown(e, dir)}
            className={`absolute w-2 h-2 bg-blue-600 ${pos[dir]}`}
        />
    );
};

export default ReportItem;
