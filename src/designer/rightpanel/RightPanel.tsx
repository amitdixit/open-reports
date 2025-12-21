import React, { useEffect, useState } from "react";
import type { ReportItemModel } from "../state/reportModel";
import { DatasourcesPanel } from "./DatasourcesPanel";
import { Tab } from "./TabPanel";
import { Input } from "./InputPanel";

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
    onCommit: (
        itemId: string,
        next: Partial<ReportItemModel>
    ) => void;
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
                            <div className="text-gray-500">
                                No item selected
                            </div>
                        ) : (
                            <>
                                <h3 className="font-semibold mb-3">
                                    Properties
                                </h3>

                                <div className="space-y-3">
                                    <Input
                                        label="Name"
                                        value={selectedItem.name}
                                        onChange={(v) =>
                                            onCommit(selectedItem.id, { name: v })
                                        } />

                                    <Input
                                        label="X"
                                        value={local.x}
                                        onChange={(v) =>
                                            setLocal({ ...local, x: v })
                                        }
                                        onBlur={commit}
                                        onKeyDown={onKeyDown}
                                    />
                                    <Input
                                        label="Y"
                                        value={local.y}
                                        onChange={(v) =>
                                            setLocal({ ...local, y: v })
                                        }
                                        onBlur={commit}
                                        onKeyDown={onKeyDown}
                                    />
                                    <Input
                                        label="Width"
                                        value={local.width}
                                        onChange={(v) =>
                                            setLocal({
                                                ...local,
                                                width: v,
                                            })
                                        }
                                        onBlur={commit}
                                        onKeyDown={onKeyDown}
                                    />
                                    <Input
                                        label="Height"
                                        value={local.height}
                                        onChange={(v) =>
                                            setLocal({
                                                ...local,
                                                height: v,
                                            })
                                        }
                                        onBlur={commit}
                                        onKeyDown={onKeyDown}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}

                {activeTab === "datasources" && (
                    <DatasourcesPanel />
                )}
            </div>
        </aside>
    );
};
export default RightPanel;
