using ReportServer.Core.Data;
using ReportServer.Core.Layout;
using ReportServer.Core.Parameters;

namespace ReportServer.Core.Reports;

public sealed record ReportDefinition
{
    public string SchemaVersion { get; init; } = "1.0";
    public Guid ReportId { get; init; }
    public string Name { get; init; } = default!;
    public string? Description { get; init; }

    public PageDefinition Page { get; init; } = default!;

    public IReadOnlyList<ReportParameterDefinition> Parameters { get; init; } = [];
    public IReadOnlyList<DatasourceReference> Datasources { get; init; } = [];
    public IReadOnlyList<DatasetDefinition> Datasets { get; init; } = [];
    public IReadOnlyList<BandDefinition> Bands { get; init; } = [];

    public IReadOnlyDictionary<string, object>? Metadata { get; init; }
}
