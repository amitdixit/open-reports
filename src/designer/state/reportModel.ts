/**
 * reportModel
 * ----------------
 * Pure domain models for the Report Designer.
 * No React, no UI concerns.
 * Backend-friendly and serializable.
 */

export type BandType =
  | "ReportHeader"
  | "PageHeader"
  | "Detail"
  | "PageFooter"
  | "ReportFooter";

export type ReportItemType =
  | "TextBox"
  | "Image"
  | "Line"
  | "Rectangle"
  | "Table"
  | "Chart"
  | "Subreport"
  | "PieChart"
  | "BarChart"
  | "LineChart";

export type ReportItemModel = {
  id: string;
  name: string;
  type: ReportItemType;
  x: number; // relative to band
  y: number; // relative to band
  width: number;
  height: number;
  props: Record<string, any>;
  text?: string; // for TextBox
  parentId?: string;
};

export type BandModel = {
  id: string;
  type: BandType;
  height: number; // px, undoable
  items: ReportItemModel[];
};

export type ReportModel = {
  id: string;
  page: {
    width: number; // px
    height: number; // px (for preview)
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  bands: BandModel[];
};

/**
 * Default band heights
 */
export const DEFAULT_BAND_HEIGHTS: Record<BandType, number> = {
  ReportHeader: 120,
  PageHeader: 80,
  Detail: 200,
  PageFooter: 80,
  ReportFooter: 120,
};
