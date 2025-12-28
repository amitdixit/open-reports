import DatasourceCard from "./DatasourceCard";
import { DbIcons } from "./DbIcons";

type DatasourceDef = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export const DatasourcesPanel = () => {
  const sources: DatasourceDef[] = [
    { id: "postgres", label: "PostgreSQL", icon: <DbIcons.DB /> },
    { id: "sql", label: "Microsoft SQL Server", icon: <DbIcons.DB /> },
    { id: "mysql", label: "MySQL", icon: <DbIcons.DB /> },
    { id: "odbc", label: "ODBC", icon: <DbIcons.DB /> },
    { id: "shared", label: "Shared", icon: <DbIcons.Shared /> },

    { id: "rds", label: "Amazon RDS", icon: <DbIcons.DB /> },
    { id: "json", label: "JSON", icon: <DbIcons.File text="{}" /> },
    { id: "odata", label: "OData", icon: <DbIcons.API /> },
    { id: "webapi", label: "Web API", icon: <DbIcons.API /> },

    { id: "xml", label: "XML", icon: <DbIcons.File text="XML" /> },
    { id: "csv", label: "CSV", icon: <DbIcons.File text="CSV" /> },
    { id: "excel", label: "Excel", icon: <DbIcons.Excel /> },
    { id: "ssas", label: "SQL Analysis Services", icon: <DbIcons.DB /> },

    { id: "elastic", label: "Elastic Search", icon: <DbIcons.Search /> },
    { id: "cdata", label: "CDATA", icon: <DbIcons.Generic /> },
    { id: "mariadb", label: "MariaDB", icon: <DbIcons.DB2 /> },
    { id: "memsql", label: "MemSQL", icon: <DbIcons.DB2 /> },
    {
      id: "azure-sql",
      label: "Azure SQL Data Warehouse",
      icon: <DbIcons.Cloud />,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Choose the type to connect
      </div>

      <div className="grid grid-cols-2 gap-2">
        {sources.map((s) => (
          <DatasourceCard key={s.id} icon={s.icon} label={s.label} />
        ))}
      </div>
    </div>
  );
};
