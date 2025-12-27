import { useEffect, useRef, useState } from "react";

import TopToolbar from "./toolbar/TopToolbar";
import LeftPalette from "./palette/LeftPalette";
import ReportSurface from "./surface/ReportSurface";
import RightPanel from "./rightpanel/RightPanel";

import {
  type ReportModel,
  type BandModel,
  type BandType,
  DEFAULT_BAND_HEIGHTS,
  type ReportItemModel,
  type ReportItemType,
} from "./state/reportModel";

const MAX_HISTORY = 50;

const ReportDesigner = () => {
  const [report] = useState<ReportModel>({
    id: "report-1",
    page: {
      width: 800,
      height: 1100,
      margin: { top: 40, right: 40, bottom: 40, left: 40 },
    },
    bands: [],
  });

  const generateId = (type: string) => `${type.toLowerCase()}-${Date.now()}`;

  const getDefaultSize = (type: string) => {
    switch (type) {
      case "TextBox":
        return { width: 120, height: 32 };
      case "Rectangle":
        return { width: 200, height: 80 };
      case "Line":
        return { width: 120, height: 2 };
      case "Image":
        return { width: 120, height: 80 };
      case "Table":
        return { width: 300, height: 120 };
      default:
        return { width: 160, height: 100 };
    }
  };

  const addItem = (type: ReportItemType) => {
    const band = present.find((b) => b.type === "Detail");

    if (!band) return;

    const { width, height } = getDefaultSize(type);

    const x = Math.round((report.page.width - width) / 2);
    const y = Math.round((band.height - height) / 2);

    const id = generateId(type);

    const nextIndex = (nameCountersRef.current[type] ?? 0) + 1;

    nameCountersRef.current[type] = nextIndex;

    const newItem: ReportItemModel = {
      id,
      type,
      x,
      y,
      width,
      height,
      name: `${type}${nextIndex}`,
      props: type === "TextBox" ? { text: "Text" } : {},
    };

    const next = present.map((b) =>
      b.id === band.id ? { ...b, items: [...b.items, newItem] } : b,
    );

    commit(next);
    setSelectedItemIds([id]);
  };

  const createInitialBands = (): BandModel[] => {
    const baseBands: {
      id: string;
      type: BandType;
      items: ReportItemModel[];
    }[] = [
      { id: "rh", type: "ReportHeader", items: [] },
      { id: "ph", type: "PageHeader", items: [] },
      { id: "dt", type: "Detail", items: [] },
      { id: "pf", type: "PageFooter", items: [] },
      { id: "rf", type: "ReportFooter", items: [] },
    ];

    return baseBands.map((b) => ({
      ...b,
      height: DEFAULT_BAND_HEIGHTS[b.type],
    }));
  };

  const onGroupDragCommit = (
    nextPositions: Record<string, { x: number; y: number }>,
  ) => {
    const next = present.map((band) => ({
      ...band,
      items: band.items.map((item) =>
        nextPositions[item.id] ? { ...item, ...nextPositions[item.id] } : item,
      ),
    }));

    commit(next);
  };

  const [past, setPast] = useState<BandModel[][]>([]);
  const [present, setPresent] = useState<BandModel[]>(createInitialBands);
  const [future, setFuture] = useState<BandModel[][]>([]);
  const nameCountersRef = useRef<Record<string, number>>({});

  const commit = (next: BandModel[]) => {
    setPast((p) => [...p.slice(-MAX_HISTORY + 1), present]);
    setPresent(next);
    setFuture([]);
  };

  const undo = () => {
    setPast((p) => {
      if (p.length === 0) return p;
      const prev = p[p.length - 1];
      setFuture((f) => [present, ...f]);
      setPresent(prev);
      return p.slice(0, p.length - 1);
    });
  };

  const redo = () => {
    setFuture((f) => {
      if (f.length === 0) return f;
      const next = f[0];
      setPast((p) => [...p, present]);
      setPresent(next);
      return f.slice(1);
    });
  };

  const [selectedBandId, setSelectedBandId] = useState<string | null>(null);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const selectedItem =
    selectedItemIds.length === 1
      ? present
          .flatMap((b) => b.items)
          .find((i) => i.id === selectedItemIds[0]) || null
      : null;

  const deleteSelectedItems = () => {
    if (selectedItemIds.length === 0) return;

    const next = present.map((band) => ({
      ...band,
      items: band.items.filter((item) => !selectedItemIds.includes(item.id)),
    }));

    commit(next);
    setSelectedItemIds([]);
  };

  const commitItemGeometry = (
    itemId: string,
    next: Partial<Pick<ReportItemModel, "x" | "y" | "width" | "height">>,
  ) => {
    const updated = present.map((band) => ({
      ...band,
      items: band.items.map((item) =>
        item.id === itemId ? { ...item, ...next } : item,
      ),
    }));

    commit(updated);
  };

  const onItemDragCommit = (itemId: string, x: number, y: number) => {
    commitItemGeometry(itemId, { x, y });
  };

  const onItemResizeCommit = (
    itemId: string,
    next: { x: number; y: number; width: number; height: number },
  ) => {
    commitItemGeometry(itemId, next);
  };

  const alignSelectedItem = (
    mode: "left" | "center" | "right" | "top" | "middle" | "bottom",
  ) => {
    if (selectedItemIds.length === 0) return;

    // Collect selected items with band reference
    const selected: {
      band: BandModel;
      item: ReportItemModel;
    }[] = [];

    for (const band of present) {
      for (const item of band.items) {
        if (selectedItemIds.includes(item.id)) {
          selected.push({ band, item });
        }
      }
    }

    if (selected.length === 0) return;

    // SINGLE ITEM → fall back to existing behavior
    if (selected.length === 1) {
      const { band, item } = selected[0];

      let x = item.x;
      let y = item.y;

      const contentWidth =
        report.page.width - report.page.margin.left - report.page.margin.right;

      if (mode === "left") x = 0;
      if (mode === "center") x = Math.round((contentWidth - item.width) / 2);
      if (mode === "right") x = contentWidth - item.width;

      if (mode === "top") y = 0;
      if (mode === "middle") y = Math.round((band.height - item.height) / 2);
      if (mode === "bottom") y = band.height - item.height;

      commitItemGeometry(item.id, { x, y });
      return;
    }

    // MULTI-SELECT → GROUP ALIGNMENT

    const minX = Math.min(...selected.map((s) => s.item.x));
    const maxX = Math.max(...selected.map((s) => s.item.x + s.item.width));
    const minY = Math.min(...selected.map((s) => s.item.y));
    const maxY = Math.max(...selected.map((s) => s.item.y + s.item.height));

    const centerX = Math.round((minX + maxX) / 2);
    const centerY = Math.round((minY + maxY) / 2);

    const next = present.map((band) => ({
      ...band,
      items: band.items.map((item) => {
        if (!selectedItemIds.includes(item.id)) return item;

        let x = item.x;
        let y = item.y;

        if (mode === "left") x = minX;
        if (mode === "center") x = centerX - item.width / 2;
        if (mode === "right") x = maxX - item.width;

        if (mode === "top") y = minY;
        if (mode === "middle") y = centerY - item.height / 2;
        if (mode === "bottom") y = maxY - item.height;

        return { ...item, x: Math.round(x), y: Math.round(y) };
      }),
    }));

    commit(next);
  };

  const distributeHorizontalEven = () => {
    if (selectedItemIds.length < 3) return;

    const selected = present
      .flatMap((b) => b.items)
      .filter((i) => selectedItemIds.includes(i.id))
      .sort((a, b) => a.x - b.x);

    const startX = selected[0].x;

    const totalWidth = selected.reduce((sum, i) => sum + i.width, 0);

    const endX = Math.max(...selected.map((i) => i.x + i.width));
    const span = endX - startX;
    const gap = (span - totalWidth) / (selected.length - 1);

    // ✅ Precompute final positions
    const positionMap: Record<string, number> = {};
    let cursor = startX;

    for (const item of selected) {
      positionMap[item.id] = Math.round(cursor);
      cursor += item.width + gap;
    }

    const next = present.map((band) => ({
      ...band,
      items: band.items.map((item) =>
        positionMap[item.id] !== undefined
          ? { ...item, x: positionMap[item.id] }
          : item,
      ),
    }));

    commit(next);
  };

  const onGroupResizeCommit = (
    next: Record<
      string,
      { x: number; y: number; width: number; height: number }
    >,
  ) => {
    const updated = present.map((band) => ({
      ...band,
      items: band.items.map((item) =>
        next[item.id] ? { ...item, ...next[item.id] } : item,
      ),
    }));

    commit(updated);
  };

  const distributeVerticalEven = () => {
    if (selectedItemIds.length < 3) return;

    const selected = present
      .flatMap((b) => b.items)
      .filter((i) => selectedItemIds.includes(i.id))
      .sort((a, b) => a.y - b.y);

    const startY = selected[0].y;

    const totalHeight = selected.reduce((sum, i) => sum + i.height, 0);

    const endY = Math.max(...selected.map((i) => i.y + i.height));
    const span = endY - startY;
    const gap = (span - totalHeight) / (selected.length - 1);

    const positionMap: Record<string, number> = {};
    let cursor = startY;

    for (const item of selected) {
      positionMap[item.id] = Math.round(cursor);
      cursor += item.height + gap;
    }

    const next = present.map((band) => ({
      ...band,
      items: band.items.map((item) =>
        positionMap[item.id] !== undefined
          ? { ...item, y: positionMap[item.id] }
          : item,
      ),
    }));

    commit(next);
  };

  const onItemTextCommit = (itemId: string, text: string) => {
    const updated = present.map((band) => ({
      ...band,
      items: band.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              props: {
                ...item.props,
                text: text ?? "", // ✅ empty string is valid
              },
            }
          : item,
      ),
    }));

    commit(updated);
  };

  /* ---------------- Keyboard shortcuts ---------------- */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;

      // 🔒 DO NOT delete items while typing
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedItemIds.length > 0
      ) {
        e.preventDefault();
        deleteSelectedItems();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.shiftKey && e.key === "Z"))
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedItemIds, present]);

  /* ---------------- Render ---------------- */

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      <TopToolbar
        onUndo={undo}
        onRedo={redo}
        onDelete={deleteSelectedItems}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
        onAlignLeft={() => alignSelectedItem("left")}
        onAlignCenter={() => alignSelectedItem("center")}
        onAlignRight={() => alignSelectedItem("right")}
        onAlignTop={() => alignSelectedItem("top")}
        onAlignMiddle={() => alignSelectedItem("middle")}
        onAlignBottom={() => alignSelectedItem("bottom")}
        onDistributeHorizontal={distributeHorizontalEven}
        onDistributeVertical={distributeVerticalEven}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftPalette onAddItem={addItem} />

        <ReportSurface
          report={report}
          bands={present}
          selectedBandId={selectedBandId}
          selectedItemIds={selectedItemIds}
          onBandSelect={setSelectedBandId}
          onItemSelect={setSelectedItemIds}
          onItemDragCommit={onItemDragCommit}
          onItemResizeCommit={onItemResizeCommit}
          onGroupDragCommit={onGroupDragCommit}
          onGroupResizeCommit={onGroupResizeCommit}
          onItemTextCommit={onItemTextCommit}
        />

        <RightPanel selectedItem={selectedItem} onCommit={commitItemGeometry} />
      </div>
    </div>
  );
};

export default ReportDesigner;
