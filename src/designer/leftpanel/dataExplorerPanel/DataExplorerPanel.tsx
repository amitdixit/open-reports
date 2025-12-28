import ExplorerSection from "./ExplorerSection";
import DatasetNode from "./DatasetNode";
import FieldNode from "./FieldNode";

const DataExplorerPanel = () => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        Data Explorer
      </h3>

      <div className="space-y-4">
        {/* Dataset */}
        <ExplorerSection>
          <DatasetNode name="SalesDB">
            <FieldNode name="OrderID" type="Int" />
            <FieldNode name="SaleDate" type="Date" />
            <FieldNode name="Region" type="String" />
            <FieldNode name="Revenue" type="Decimal" />
            <FieldNode name="SalesPerson" type="String" />
          </DatasetNode>
        </ExplorerSection>

        {/* Parameters */}
        <ExplorerSection>
          <DatasetNode name="Parameters" isParameter>
            <FieldNode name="StartDate" type="Date" />
            <FieldNode name="EndDate" type="Date" />
          </DatasetNode>
        </ExplorerSection>
      </div>
    </div>
  );
};

export default DataExplorerPanel;
