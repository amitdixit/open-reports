import React, { useRef, useState } from "react";
import type {
  ReportModel,
  BandModel,
  ReportItemModel,
} from "../state/reportModel";
import Band from "../bands/Band";

type ResizeDir = "nw" | "ne" | "sw" | "se";
const ReportSurface = ({
  report,
  bands,
  selectedBandId,
  selectedItemIds,
  onBandSelect,
  onItemSelect,
  onItemDragCommit,
  onItemResizeCommit,
  onGroupDragCommit,
  onGroupResizeCommit,
  onItemTextCommit,
}: {
  report: ReportModel;
  bands: BandModel[];
  selectedBandId: string | null;
  selectedItemIds: string[];
  onBandSelect: (bandId: string) => void;
  onItemSelect: React.Dispatch<React.SetStateAction<string[]>>;
  onItemDragCommit: (itemId: string, x: number, y: number) => void;
  onItemResizeCommit: (
    itemId: string,
    next: { x: number; y: number; width: number; height: number },
  ) => void;
  onGroupDragCommit: (next: Record<string, { x: number; y: number }>) => void;
  onGroupResizeCommit: (
    next: Record<
      string,
      { x: number; y: number; width: number; height: number }
    >,
  ) => void;
  onItemTextCommit: (itemId: string, text: string) => void;
}) => {
  const GRID_SIZE = 8;
  const MIN_WIDTH = 24;
  const MIN_HEIGHT = 16;

  const snap = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  // Transient preview positions: itemId -> { x, y }
  const [previewPositions, setPreviewPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  const [resizePreview, setResizePreview] = useState<
    Record<string, { x: number; y: number; width: number; height: number }>
  >({});

  const resizeMouseStartRef = useRef<{ x: number; y: number } | null>(null);
  const isGroupResizeActiveRef = useRef(false);
  const lastGroupResizePreviewRef = useRef<
    Record<string, { x: number; y: number; width: number; height: number }>
  >({});

  const groupDragStartRef = useRef<Record<
    string,
    { x: number; y: number }
  > | null>(null);

  const singleDragStartRef = useRef<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const groupResizeStartRef = useRef<{
    dir: ResizeDir;
    bounds: { x: number; y: number; width: number; height: number };
    items: Record<
      string,
      { x: number; y: number; width: number; height: number }
    >;
  } | null>(null);

  const getGroupBounds = (
    items: Record<
      string,
      { x: number; y: number; width: number; height: number }
    >,
  ) => {
    const list = Object.values(items);

    const minX = Math.min(...list.map((i) => i.x));
    const minY = Math.min(...list.map((i) => i.y));
    const maxX = Math.max(...list.map((i) => i.x + i.width));
    const maxY = Math.max(...list.map((i) => i.y + i.height));

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  };

  const isGroupResizing = Boolean(groupResizeStartRef.current);

  const handleGroupResizeStart = (itemId: string, dir: ResizeDir) => {
    if (selectedItemIds.length <= 1) return;

    const items: Record<
      string,
      { x: number; y: number; width: number; height: number }
    > = {};

    for (const band of bands) {
      for (const item of band.items) {
        if (selectedItemIds.includes(item.id)) {
          items[item.id] = {
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
          };
        }
      }
    }

    groupResizeStartRef.current = {
      dir,
      bounds: getGroupBounds(items),
      items,
    };
    isGroupResizeActiveRef.current = true;
    resizeMouseStartRef.current = null;
  };

  const handleItemDragStart = (itemId: string) => {
    // GROUP DRAG
    if (selectedItemIds.length > 1) {
      const snapshot: Record<string, { x: number; y: number }> = {};

      for (const band of bands) {
        for (const item of band.items) {
          if (selectedItemIds.includes(item.id)) {
            snapshot[item.id] = { x: item.x, y: item.y };
          }
        }
      }

      groupDragStartRef.current = snapshot;
      singleDragStartRef.current = null;
      return;
    }

    // SINGLE DRAG
    for (const band of bands) {
      const item = band.items.find((i) => i.id === itemId);
      if (item) {
        singleDragStartRef.current = {
          id: itemId,
          x: item.x,
          y: item.y,
        };
        break;
      }
    }

    groupDragStartRef.current = null;
  };

  const handleItemDrag = (
    itemId: string,
    dx: number,
    dy: number,
    isFinal: boolean,
  ) => {
    if (!bands.length) return;
    const snappedDx = snap(dx);
    const snappedDy = snap(dy);

    /**
     * -----------------------------
     * SINGLE ITEM DRAG
     * -----------------------------
     */
    if (!groupDragStartRef.current && singleDragStartRef.current) {
      const start = singleDragStartRef.current;
      const x = snap(start.x + snappedDx);
      const y = snap(start.y + snappedDy);

      if (isFinal) {
        const allItems = bands.flatMap((b) => b.items);

        const draggedItem = allItems.find((i) => i.id === itemId);
        if (!draggedItem) {
          clearDragPreview();
          return;
        }

        const containerId = resolveContainerId(
          itemId,
          {
            x,
            y,
            width: draggedItem.width,
            height: draggedItem.height,
          },
          allItems,
        );
        onItemDragCommit(itemId, x, y);

        if (containerId !== draggedItem.containerId) {
          onItemResizeCommit(itemId, {
            x,
            y,
            width: draggedItem.width,
            height: draggedItem.height,
            containerId,
          } as any);
        }

        clearDragPreview();

        return;
      }

      setPreviewPositions({ [itemId]: { x, y } });
      return;
    }

    /**
     * -----------------------------
     * GROUP DRAG
     * -----------------------------
     */
    const snapshot = groupDragStartRef.current;
    if (!snapshot || Object.keys(snapshot).length === 0) return;

    const preview: Record<string, { x: number; y: number }> = {};

    for (const id of Object.keys(snapshot)) {
      preview[id] = {
        x: snap(snapshot[id].x + snappedDx),
        y: snap(snapshot[id].y + snappedDy),
      };
    }

    if (isFinal) {
      onGroupDragCommit(preview);
      clearDragPreview();

      return;
    }

    setPreviewPositions(preview);
  };

  const applyGroupResize = (dx: number, dy: number) => {
    const snap = groupResizeStartRef.current;
    if (!snap) return;

    const { bounds, items, dir } = snap;

    let scaleX = 1;
    let scaleY = 1;

    if (dir.includes("e")) scaleX = (bounds.width + dx) / bounds.width;
    if (dir.includes("w")) scaleX = (bounds.width - dx) / bounds.width;
    if (dir.includes("s")) scaleY = (bounds.height + dy) / bounds.height;
    if (dir.includes("n")) scaleY = (bounds.height - dy) / bounds.height;

    const preview: typeof resizePreview = {};

    for (const id of Object.keys(items)) {
      const item = items[id];

      const relX = item.x - bounds.x;
      const relY = item.y - bounds.y;

      preview[id] = {
        x: Math.round(bounds.x + relX * scaleX),
        y: Math.round(bounds.y + relY * scaleY),
        width: Math.round(item.width * scaleX),
        height: Math.round(item.height * scaleY),
      };
    }

    lastGroupResizePreviewRef.current = preview;
    setResizePreview(preview);
  };

  const handleItemResize = (
    itemId: string,
    dx: number,
    dy: number,
    dir: ResizeDir,
    isFinal: boolean,
  ) => {
    // -----------------------------
    // GROUP RESIZE
    // -----------------------------
    if (isGroupResizeActiveRef.current && groupResizeStartRef.current) {
      applyGroupResize(dx, dy);

      if (isFinal) {
        onGroupResizeCommit(lastGroupResizePreviewRef.current);
        groupResizeStartRef.current = null;
        isGroupResizeActiveRef.current = false;
        lastGroupResizePreviewRef.current = {};
        setResizePreview({});
      }
      return;
    }

    // -----------------------------
    // SINGLE ITEM RESIZE
    // -----------------------------
    const item = bands.flatMap((b) => b.items).find((i) => i.id === itemId);

    if (!item) return;

    let x = item.x;
    let y = item.y;
    let width = item.width;
    let height = item.height;

    if (dir.includes("e")) width += dx;
    if (dir.includes("s")) height += dy;
    if (dir.includes("w")) {
      width -= dx;
      x += dx;
    }
    if (dir.includes("n")) {
      height -= dy;
      y += dy;
    }

    const snapped = {
      x: snap(x),
      y: snap(y),
      width: Math.max(snap(width), MIN_WIDTH),
      height: Math.max(snap(height), MIN_HEIGHT),
    };

    if (isFinal) {
      const allItems = bands.flatMap((b) => b.items);

      const containerId = resolveContainerId(itemId, snapped, allItems);

      onItemResizeCommit(itemId, {
        ...snapped,
        containerId,
      } as any);
      setResizePreview({});
      return;
    }

    setResizePreview({ [itemId]: snapped });
  };

  const handleItemSelect = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    onItemSelect((prev) => {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        return prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId];
      }

      return [itemId];
    });
  };

  const applyPreview = (item: ReportItemModel): ReportItemModel => {
    const drag = previewPositions[item.id];
    const resize = resizePreview[item.id];

    if (resize) {
      return { ...item, ...resize };
    }

    if (drag) {
      return { ...item, x: drag.x, y: drag.y };
    }

    return item;
  };

  const clearDragPreview = () => {
    setPreviewPositions({});
    groupDragStartRef.current = null;
    singleDragStartRef.current = null;
    isGroupResizeActiveRef.current = false;
    lastGroupResizePreviewRef.current = {};
  };

  const cancelDrag = () => {
    setPreviewPositions({});
    groupDragStartRef.current = null;
    singleDragStartRef.current = null;
    isGroupResizeActiveRef.current = false;
    lastGroupResizePreviewRef.current = {};
  };

  const resolveContainerId = (
    itemId: string,
    item: { x: number; y: number; width: number; height: number },
    items: ReportItemModel[],
  ): string | undefined => {
    const containers = items.filter(
      (i) =>
        i.id !== itemId && // ⛔ prevent self-containment
        i.type === "Rectangle" &&
        item.x >= i.x &&
        item.y >= i.y &&
        item.x + item.width <= i.x + i.width &&
        item.y + item.height <= i.y + i.height,
    );

    if (containers.length === 0) return undefined;

    // Prefer the deepest (smallest enclosing rectangle)
    containers.sort((a, b) => a.width * a.height - b.width * b.height);

    return containers[0].id;
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-200 flex justify-center py-6">
      <div
        className="bg-white shadow relative"
        style={{ width: report.page.width, minHeight: report.page.height }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundSize: "8px 8px",
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          }}
        />

        {/* Bands */}
        <div className="relative">
          {bands.map((band) => (
            <Band
              key={band.id}
              band={{
                ...band,
                items: band.items.map(applyPreview),
              }}
              selectedBandId={selectedBandId}
              selectedItemIds={selectedItemIds}
              isGroupResizing={isGroupResizing}
              onBandSelect={onBandSelect}
              onItemSelect={handleItemSelect}
              onItemDrag={handleItemDrag}
              onDragStart={handleItemDragStart}
              onItemResize={handleItemResize}
              onDragCancel={cancelDrag}
              onGroupResizeStart={handleGroupResizeStart}
              onItemTextCommit={onItemTextCommit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportSurface;
