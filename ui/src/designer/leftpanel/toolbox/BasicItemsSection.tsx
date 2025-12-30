import { Icons } from "../../icons/icons";
import type { ReportItemType } from "../../state/reportModel";
import { Section, PaletteItem } from "./CommonSection";

const BasicItemsSection = ({
  onAddItem,
}: {
  onAddItem: (type: ReportItemType) => void;
}) => {
  return (
    <Section title="BASIC ITEMS">
      <PaletteItem
        icon={<Icons.Textbox />}
        label="Text Box"
        onClick={() => onAddItem("TextBox")}
      />
      <PaletteItem
        icon={<Icons.Image />}
        label="Image"
        onClick={() => onAddItem("Image")}
      />
      <PaletteItem
        icon={<Icons.Line />}
        label="Line"
        onClick={() => onAddItem("Line")}
      />
      <PaletteItem
        icon={<Icons.Rect />}
        label="Rectangle"
        onClick={() => onAddItem("Rectangle")}
      />
      <PaletteItem
        icon={<Icons.Table />}
        label="Table"
        onClick={() => onAddItem("Table")}
      />
      <PaletteItem
        icon={<Icons.Subreport />}
        label="Subreport"
        onClick={() => onAddItem("Subreport")}
      />
    </Section>
  );
};

export default BasicItemsSection;
