import React from "react";
import type { ReportItemType } from "../state/reportModel";

/* ---------------- Icons ---------------- */

const IconText = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="14" y2="12" />
    <line x1="4" y1="18" x2="10" y2="18" />
  </svg>
);

const IconImage = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const IconLine = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" y1="20" x2="20" y2="4" />
  </svg>
);

const IconRect = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="4" width="16" height="16" />
  </svg>
);

const IconTable = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

const IconSubreport = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="14" height="14" />
    <rect x="7" y="7" width="14" height="14" />
  </svg>
);

const IconChart = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="6" y1="20" x2="6" y2="10" />
    <line x1="12" y1="20" x2="12" y2="6" />
    <line x1="18" y1="20" x2="18" y2="14" />
  </svg>
);

/* ---------------- Palette ---------------- */

const LeftPalette = ({
  onAddItem,
}: {
  onAddItem: (type: ReportItemType) => void;
}) => {
  return (
    <aside className="w-56 border-r bg-white flex flex-col">
      <Section title="BASIC ITEMS">
        <PaletteItem
          icon={<IconText />}
          label="Text Box"
          onClick={() => onAddItem("TextBox")}
        />
        <PaletteItem
          icon={<IconImage />}
          label="Image"
          onClick={() => onAddItem("Image")}
        />
        <PaletteItem
          icon={<IconLine />}
          label="Line"
          onClick={() => onAddItem("Line")}
        />
        <PaletteItem
          icon={<IconRect />}
          label="Rectangle"
          onClick={() => onAddItem("Rectangle")}
        />
        <PaletteItem
          icon={<IconTable />}
          label="Table"
          onClick={() => onAddItem("Table")}
        />
        <PaletteItem
          icon={<IconSubreport />}
          label="Subreport"
          onClick={() => onAddItem("Subreport")}
        />
      </Section>

      <Section title="CHARTS">
        <PaletteItem
          icon={<IconChart />}
          label="Bar Chart"
          onClick={() => onAddItem("BarChart")}
        />
        <PaletteItem
          icon={<IconChart />}
          label="Line Chart"
          onClick={() => onAddItem("LineChart")}
        />
        <PaletteItem
          icon={<IconChart />}
          label="Pie Chart"
          onClick={() => onAddItem("PieChart")}
        />
      </Section>
    </aside>
  );
};

/* ---------------- Helpers ---------------- */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b">
      {title}
    </div>
    <div className="p-2 space-y-1 text-sm">{children}</div>
  </>
);

const PaletteItem = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className=" flex items-center gap-2
       px-3 py-2
       cursor-pointer
       text-sm text-gray-700
       hover:bg-gray-100
       hover:text-blue-600
       rounded-sm"
    >
      <span className="text-gray-500">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default LeftPalette;
