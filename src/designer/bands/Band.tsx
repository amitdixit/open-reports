import React from "react";
import { type BandModel } from "../state/reportModel";
import BandResizeHandle from "./BandResizeHandle";
import ReportItem from "../items/ReportItem";

/**
 * Band
 * ----------------
 */

const Band = ({
  band,
  selectedBandId,
  selectedItemIds,
  isGroupResizing,
  onBandSelect,
  onItemSelect,
  onItemDrag,
  onItemResize,
  onDragStart,
  onDragCancel,
  onGroupResizeStart,
  onItemTextCommit,
}: {
  band: BandModel;
  selectedBandId: string | null;
  selectedItemIds: string[];
  isGroupResizing?: boolean;
  onItemSelect: (itemId: string, e: React.MouseEvent) => void;
  onBandSelect: (bandId: string) => void;
  onItemDrag: (itemId: string, x: number, y: number, isFinal: boolean) => void;
  onItemResize: (
    itemId: string,
    dx: number,
    dy: number,
    dir: "nw" | "ne" | "sw" | "se",
    isFinal: boolean,
  ) => void;
  onDragStart?: (itemId: string) => void;
  onDragCancel?: () => void;
  onGroupResizeStart?: (itemId: string, dir: "nw" | "ne" | "sw" | "se") => void;
  onItemTextCommit: (itemId: string, text: string) => void;
}) => {
  return (
    <div
      tabIndex={0}
      onClick={() => onBandSelect(band.id)}
      className={
        "relative border-b outline-none " +
        (selectedBandId === band.id
          ? "border-blue-400 bg-blue-100"
          : "border-gray-300 bg-gray-50 hover:bg-blue-50")
      }
      style={{ height: band.height }}
    >
      {/* Band label */}
      <div className="absolute left-0 top-0 h-full w-28 border-r border-gray-300 bg-gray-100 flex items-center px-2 pointer-events-none">
        <span className="text-xs font-semibold text-gray-600 truncate">
          {band.type}
        </span>
      </div>

      <div className="absolute inset-0 ml-28 overflow-hidden">
        {/* 1️⃣ Rectangles FIRST */}
        {band.items
          .filter((item) => item.type === "Rectangle")
          .map((rect) => {
            const children = band.items.filter((i) => i.parentId === rect.id);

            return (
              <div
                key={rect.id}
                style={{
                  position: "absolute",
                  left: rect.x,
                  top: rect.y,
                  width: rect.width,
                  height: rect.height,
                }}
              >
                <ReportItem
                  item={{ ...rect, x: 0, y: 0 }}
                  isSelected={selectedItemIds.includes(rect.id)}
                  isGroupResizing={isGroupResizing}
                  onSelect={onItemSelect}
                  onDrag={onItemDrag}
                  onResize={onItemResize}
                  onDragStart={onDragStart}
                  onDragCancel={onDragCancel}
                  onGroupResizeStart={onGroupResizeStart}
                  onItemTextCommit={onItemTextCommit}
                />

                {children.map((child) => (
                  <ReportItem
                    key={child.id}
                    item={{
                      ...child,
                      x: child.x - rect.x,
                      y: child.y - rect.y,
                    }}
                    isSelected={selectedItemIds.includes(child.id)}
                    isGroupResizing={isGroupResizing}
                    onSelect={onItemSelect}
                    onDrag={onItemDrag}
                    onResize={onItemResize}
                    onDragStart={onDragStart}
                    onDragCancel={onDragCancel}
                    onGroupResizeStart={onGroupResizeStart}
                    onItemTextCommit={onItemTextCommit}
                  />
                ))}
              </div>
            );
          })}

        {/* 2️⃣ Normal items LAST */}
        {band.items
          .filter((item) => !item.parentId && item.type !== "Rectangle")
          .map((item) => (
            <ReportItem
              key={item.id}
              item={item}
              isSelected={selectedItemIds.includes(item.id)}
              isGroupResizing={isGroupResizing}
              onSelect={onItemSelect}
              onDrag={onItemDrag}
              onResize={onItemResize}
              onDragStart={onDragStart}
              onDragCancel={onDragCancel}
              onGroupResizeStart={onGroupResizeStart}
              onItemTextCommit={onItemTextCommit}
            />
          ))}
      </div>

      <BandResizeHandle />
    </div>
  );
};

export default Band;
