import { Icons } from "../../icons/icons";
import type { ReportItemType } from "../../state/reportModel";
import { PaletteItem, Section } from "./CommonSection";

const ChartsSection = ({
  onAddItem,
}: {
  onAddItem: (type: ReportItemType) => void;
}) => {
  return (
    <Section title="CHARTS">
      <PaletteItem
        icon={<Icons.Chart />}
        label="Bar Chart"
        onClick={() => onAddItem("BarChart")}
      />
      <PaletteItem
        icon={<Icons.Chart2 />}
        label="Line Chart"
        onClick={() => onAddItem("LineChart")}
      />
      <PaletteItem
        icon={<Icons.Table2 />}
        label="Pie Chart"
        onClick={() => onAddItem("PieChart")}
      />
    </Section>
  );
};

export default ChartsSection;
