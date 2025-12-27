import React from "react";
import { type BandModel } from "../state/reportModel";
import BandResizeHandle from "./BandResizeHandle";
import ReportItem from "../items/ReportItem";

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
  const isEmpty = band.items.length === 0;
  const isDetail = band.type === "Detail";
  const containerUsage = new Set(
    band.items.filter((i) => i.containerId).map((i) => i.containerId),
  );

  const containerIds = new Set(
    band.items
      .map((i) => i.containerId)
      .filter((id): id is string => Boolean(id)),
  );

  return (
    <div
      tabIndex={0}
      onClick={() => onBandSelect(band.id)}
      className={
        "relative border-b outline-none group " +
        (selectedBandId === band.id
          ? "border-blue-400 bg-blue-100" // keep selected band solid
          : isEmpty
            ? "border-gray-200 bg-gradient-to-b from-white/60 to-gray-50/60 hover:from-gray-50/60"
            : "border-gray-300 bg-gray-50/60 hover:bg-blue-50/60")
      }
      style={{ height: band.height }}
    >
      {/* Band header */}
      <div
        className={
          "h-6 px-2 flex items-center border-b pointer-events-none " +
          (isDetail
            ? "border-gray-300 bg-gray-200"
            : isEmpty
              ? "border-gray-200 bg-gray-50"
              : "border-gray-300 bg-gray-100")
        }
      >
        <span
          className={
            "text-xs " +
            (isDetail ? "font-bold" : "font-semibold") +
            " " +
            (isEmpty ? "text-gray-400" : "text-gray-600")
          }
        >
          {band.type}
        </span>
      </div>

      {/* Band content */}
      <div
        className={
          "absolute left-0 right-0 overflow-hidden transition-all duration-150 " +
          (isEmpty ? "top-6 h-6 opacity-40" : "top-6 bottom-0")
        }
      >
        {band.items
          .slice()
          .sort((a, b) => (a.type === "Rectangle" ? -1 : 1))
          .map((item) => (
            <ReportItem
              key={item.id}
              item={{
                ...item,
                props: {
                  ...item.props,
                  hasChildren: containerUsage.has(item.id),
                },
              }}
              isSelected={selectedItemIds.includes(item.id)}
              isGroupResizing={isGroupResizing}
              onSelect={onItemSelect}
              onDrag={onItemDrag}
              onResize={onItemResize}
              onDragStart={onDragStart}
              onDragCancel={onDragCancel}
              onGroupResizeStart={onGroupResizeStart}
              onItemTextCommit={onItemTextCommit}
              hasChildren={containerIds.has(item.id)}
              isContained={Boolean(item.containerId)}
            />
          ))}
      </div>

      <div
        className={
          "transition-opacity duration-150 " +
          (isEmpty
            ? "opacity-0 group-hover:opacity-40"
            : "opacity-0 group-hover:opacity-100")
        }
      >
        <BandResizeHandle />
      </div>
    </div>
  );
};

export default Band;
