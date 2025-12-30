/**
 * BandResizeHandle
 * ----------------
 * Visual resize handle for a report band.
 *
 * Responsibilities:
 * - Render a horizontal resize affordance at the bottom of a band
 * - Emit mouse down intent via callback
 *
 * Explicitly does NOT:
 * - Perform resize math
 * - Touch undo/redo
 * - Know about band height
 */

const BandResizeHandle = ({ onMouseDown }: { onMouseDown?: () => void }) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-2 cursor-row-resize flex items-center justify-center"
      onMouseDown={onMouseDown}
    >
      <div className="w-10 h-0.5 bg-gray-400 rounded" />
    </div>
  );
};

export default BandResizeHandle;
