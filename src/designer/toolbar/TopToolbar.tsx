
/**
 * TopToolbar
 * ----------------
 * Phase 6 – Undo / Redo / Delete commands wired.
 * Pure presentational component.
 */

const TopToolbar = ({
    onUndo,
    onRedo,
    onDelete,
    canUndo,
    canRedo,
    onAlignLeft,
    onAlignCenter,
    onAlignRight,
    onAlignTop,
    onAlignMiddle,
    onAlignBottom,
    onDistributeHorizontal,
    onDistributeVertical
}: {
    onUndo: () => void;
    onRedo: () => void;
    onDelete: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onAlignLeft: () => void;
    onAlignCenter: () => void;
    onAlignRight: () => void;
    onAlignTop: () => void;
    onAlignMiddle: () => void;
    onAlignBottom: () => void;
    onDistributeHorizontal: () => void;
    onDistributeVertical: () => void;


}) => {
    return (
        <div className="h-12 flex items-center gap-2 px-3 border-b bg-white">
            {/* File actions */}
            <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">New</button>
            <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">Open</button>
            <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">Save</button>

            <span className="mx-2 h-6 border-l" />

            {/* Edit actions */}
            <button
                onClick={onUndo}
                disabled={!canUndo}
                className={`px-3 py-1 text-sm rounded ${canUndo
                    ? "hover:bg-gray-100"
                    : "text-gray-400 cursor-not-allowed"
                    }`}
            >
                Undo
            </button>
            <button
                onClick={onRedo}
                disabled={!canRedo}
                className={`px-3 py-1 text-sm rounded ${canRedo
                    ? "hover:bg-gray-100"
                    : "text-gray-400 cursor-not-allowed"
                    }`}
            >
                Redo
            </button>
            <span className="mx-2 h-6 border-l" />

            <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                title="Align Left" onClick={onAlignLeft}
            >
                ⬅
            </button>
            <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                title="Align Center" onClick={onAlignCenter}
            >
                ↔
            </button>
            <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                title="Align Right" onClick={onAlignRight}
            >
                ➡
            </button>
            <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                title="Align Top" onClick={onAlignTop}
            >
                ⬆
            </button>
            <button
                onClick={onAlignMiddle}
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                title="Align Vertical Center"
            >
                ↕
            </button>

            <button
                onClick={onAlignBottom}
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                title="Align Bottom"
            >
                ⬇
            </button>

            <button
                onClick={onDistributeHorizontal}
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                title="Distribute Horizontally"
            >
                ⇤⇥
            </button>

            <button
                onClick={onDistributeVertical}
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                title="Distribute Vertically"
            >
                ⇧⇩
            </button>


            <button
                onClick={onDelete}
                className="px-3 py-1 text-sm rounded text-red-600 hover:bg-red-50"
            >
                Delete
            </button>

            <span className="mx-2 h-6 border-l" />

            <div className="flex-1" />

            <button className="px-4 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">
                Preview
            </button>
        </div>
    );
};

export default TopToolbar;