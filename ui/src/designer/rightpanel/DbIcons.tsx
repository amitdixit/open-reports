/** Common props for all DB icons */
const baseSvgProps = {
  className: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
};

export const DbIcons = {
  Cloud: () => (
    <svg viewBox="0 0 24 24" {...baseSvgProps}>
      <path d="M6 18h11a4 4 0 0 0 0-8 5 5 0 0 0-9-2A4 4 0 0 0 6 18z" />
    </svg>
  ),
  DB: () => (
    <svg viewBox="0 0 24 24" {...baseSvgProps}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v13c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    </svg>
  ),

  DB2: () => (
    <svg viewBox="0 0 24 24" {...baseSvgProps}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  ),

  /** Excel */
  Excel: () => (
    <div className="w-5 h-5 border border-slate-300 rounded flex items-center justify-center text-[10px] font-semibold text-slate-600">
      X
    </div>
  ),

  /** CSV */
  CSV: () => (
    <div className="w-5 h-5 border border-slate-300 rounded flex items-center justify-center text-[9px] font-mono text-slate-600">
      CSV
    </div>
  ),
  File: ({ text }: { text: string }) => (
    <div className="w-8 h-8 border rounded flex items-center justify-center text-[10px] font-mono">
      {text}
    </div>
  ),
  Generic: () => (
    <svg viewBox="0 0 24 24" {...baseSvgProps}>
      <rect x="4" y="4" width="16" height="16" />
    </svg>
  ),
  /** JSON */
  JSON: () => (
    <div className="w-5 h-5 border border-slate-300 rounded flex items-center justify-center text-[9px] font-mono text-slate-600">
      {"{}"}
    </div>
  ),

  /** XML */
  XML: () => (
    <div className="w-5 h-5 border border-slate-300 rounded flex items-center justify-center text-[9px] font-mono text-slate-600">
      XML
    </div>
  ),

  /** Web API / OData */
  API: () => (
    <svg viewBox="0 0 24 24" {...baseSvgProps}>
      <path d="M12 3v6m0 6v6M3 12h6m6 0h6" />
    </svg>
  ),

  /** Shared */
  Shared: () => (
    <svg viewBox="0 0 24 24" {...baseSvgProps}>
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 12h8M16 8l-4 4 4 4" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" {...baseSvgProps}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};
