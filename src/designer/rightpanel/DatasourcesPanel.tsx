import DatasourceCard from "./DatasourceCard";

type DatasourceDef = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

const DbIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
    </svg>
);

const CloudDbIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 18h11a4 4 0 0 0 0-8 5 5 0 0 0-9-2A4 4 0 0 0 6 18z" />
    </svg>
);

const ApiIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12h4M16 12h4M10 6l-2 12M14 6l2 12" />
    </svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const ExcelIcon = () => (
    <div className="w-8 h-8 bg-green-600 text-white text-xs font-bold flex items-center justify-center rounded">
        X
    </div>
);

const FileIcon = ({ text }: { text: string }) => (
    <div className="w-8 h-8 border rounded flex items-center justify-center text-[10px] font-mono">
        {text}
    </div>
);

const SharedIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 11l8-4M8 13l8 4" />
    </svg>
);

const GenericIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" />
    </svg>
);



export const DatasourcesPanel = () => {
    const sources: DatasourceDef[] = [
        { id: "postgres", label: "PostgreSQL", icon: <DbIcon /> },
        { id: "sql", label: "Microsoft SQL Server", icon: <DbIcon /> },
        { id: "mysql", label: "MySQL", icon: <DbIcon /> },
        { id: "odbc", label: "ODBC", icon: <DbIcon /> },
        { id: "shared", label: "Shared", icon: <SharedIcon /> },

        { id: "rds", label: "Amazon RDS", icon: <CloudDbIcon /> },
        { id: "json", label: "JSON", icon: <FileIcon text="{}" /> },
        { id: "odata", label: "OData", icon: <ApiIcon /> },
        { id: "webapi", label: "Web API", icon: <ApiIcon /> },

        { id: "xml", label: "XML", icon: <FileIcon text="XML" /> },
        { id: "csv", label: "CSV", icon: <FileIcon text="CSV" /> },
        { id: "excel", label: "Excel", icon: <ExcelIcon /> },
        { id: "ssas", label: "SQL Analysis Services", icon: <DbIcon /> },

        { id: "elastic", label: "Elastic Search", icon: <SearchIcon /> },
        { id: "cdata", label: "CDATA", icon: <GenericIcon /> },
        { id: "mariadb", label: "MariaDB", icon: <DbIcon /> },
        { id: "memsql", label: "MemSQL", icon: <DbIcon /> },
        { id: "azure-sql", label: "Azure SQL Data Warehouse", icon: <CloudDbIcon /> },

    ];

    return (
        <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700">
                Choose the type to connect
            </div>

            <div className="grid grid-cols-2 gap-3">
                {sources.map((s) => (
                    <DatasourceCard
                        key={s.id}
                        icon={s.icon}
                        label={s.label}
                    />
                ))}
            </div>
        </div>
    );
};
