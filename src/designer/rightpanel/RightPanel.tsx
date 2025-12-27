import React, { useEffect, useState } from "react";
import type { ReportItemModel } from "../state/reportModel";
import { DatasourcesPanel } from "./DatasourcesPanel";
import { Tab } from "./TabPanel";
import TextBoxProperties from "./properties/TextBoxProperties";
import CommonProperties from "./properties/CommonProperties";
import ImageProperties from "./properties/ImageProperties";
import TableProperties from "./properties/TableProperties";
import LineProperties from "./properties/LineProperties";
import AppearanceProperties from "./properties/AppearanceProperties";
import PropertyGroup from "./properties/PropertyGroup";
import TableHeaderProperties from "./properties/TableHeaderProperties";
import TableBodyProperties from "./properties/TableBodyProperties";
import TableFooterProperties from "./properties/TableFooterProperties";
import { Input } from "./controls/Input";

const GRID_SIZE = 8;
const MIN_WIDTH = 24;
const MIN_HEIGHT = 16;

const snap = (v: number) => Math.round(v / GRID_SIZE) * GRID_SIZE;

type TabKey = "properties" | "datasources";

const RightPanel = ({
  selectedItem,
  onCommit,
}: {
  selectedItem: ReportItemModel | null;
  onCommit: (itemId: string, next: Partial<ReportItemModel>) => void;
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>("properties");

  const [local, setLocal] = useState<{
    x: string;
    y: string;
    width: string;
    height: string;
  } | null>(null);

  /* ---------------- Sync selection ---------------- */

  useEffect(() => {
    if (!selectedItem) {
      setLocal(null);
      return;
    }

    setLocal({
      x: String(selectedItem.x),
      y: String(selectedItem.y),
      width: String(selectedItem.width),
      height: String(selectedItem.height),
    });
  }, [selectedItem]);

  /* ---------------- Commit helpers ---------------- */

  const commit = () => {
    if (!selectedItem || !local) return;

    const x = snap(Number(local.x));
    const y = snap(Number(local.y));
    const width = Math.max(snap(Number(local.width)), MIN_WIDTH);
    const height = Math.max(snap(Number(local.height)), MIN_HEIGHT);

    onCommit(selectedItem.id, { x, y, width, height });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      commit();
      (e.target as HTMLInputElement).blur();
    }
  };

  const renderTypeProperties = () => {
    if (!selectedItem) return null;

    switch (selectedItem.type) {
      case "TextBox":
        return (
          <>
            <PropertyGroup title="Position">
              <CommonProperties
                item={selectedItem}
                local={local}
                setLocal={setLocal}
                onCommit={onCommit}
                onKeyDown={onKeyDown}
              />
            </PropertyGroup>
            <PropertyGroup title="Basic Settings" defaultOpen>
              <TextBoxProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>

            <PropertyGroup title="Appearance">
              <AppearanceProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>
          </>
        );

      case "Rectangle":
      case "Line":
        return (
          <>
            <PropertyGroup title="Position">
              <CommonProperties
                item={selectedItem}
                local={local}
                setLocal={setLocal}
                onCommit={onCommit}
                onKeyDown={onKeyDown}
              />
            </PropertyGroup>
            <PropertyGroup title="Appearance" defaultOpen>
              <AppearanceProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>
          </>
        );
      case "Table":
        return (
          <>
            <PropertyGroup title="Table" defaultOpen>
              <TableProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>

            <PropertyGroup title="Header">
              <TableHeaderProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>

            <PropertyGroup title="Body">
              <TableBodyProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>

            <PropertyGroup title="Footer">
              <TableFooterProperties item={selectedItem} />
            </PropertyGroup>

            <PropertyGroup title="Appearance">
              <AppearanceProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>

            <PropertyGroup title="Position">
              <CommonProperties
                item={selectedItem}
                local={local}
                setLocal={setLocal}
                onCommit={onCommit}
                onKeyDown={onKeyDown}
              />
            </PropertyGroup>
          </>
        );
      case "Image":
        return (
          <>
            <PropertyGroup title="Position">
              <CommonProperties
                item={selectedItem}
                local={local}
                setLocal={setLocal}
                onCommit={onCommit}
                onKeyDown={onKeyDown}
              />
            </PropertyGroup>
            <PropertyGroup title="Image">
              <ImageProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>

            <PropertyGroup title="Appearance">
              <AppearanceProperties item={selectedItem} onCommit={onCommit} />
            </PropertyGroup>
          </>
        );

      default:
        return null;
    }
  };

  /* ---------------- Render ---------------- */

  return (
    <aside className="w-80 border-l bg-white flex flex-col">
      {/* Tabs */}
      <div className="flex border-b">
        <Tab
          label="Properties"
          active={activeTab === "properties"}
          onClick={() => setActiveTab("properties")}
        />
        <Tab
          label="Datasources"
          active={activeTab === "datasources"}
          onClick={() => setActiveTab("datasources")}
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-3 text-sm overflow-auto">
        {activeTab === "properties" && (
          <>
            {!selectedItem || !local ? (
              <div className="text-gray-500">No item selected</div>
            ) : (
              <>
                <Input
                  label="Name"
                  value={selectedItem.name ?? ""}
                  onChange={(v) => onCommit(selectedItem.id, { name: v })}
                />
                {renderTypeProperties()}
              </>
            )}
          </>
        )}

        {activeTab === "datasources" && <DatasourcesPanel />}
      </div>
    </aside>
  );
};
export default RightPanel;
