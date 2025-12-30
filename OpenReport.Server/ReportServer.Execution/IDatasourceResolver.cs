using ReportServer.Core.Data;

namespace ReportServer.Execution;

public interface IDatasourceResolver
{
    Task<ResolvedDatasource> ResolveAsync(DatasourceReference datasource, CancellationToken ct);
}