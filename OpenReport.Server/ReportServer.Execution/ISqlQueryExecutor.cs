using ReportServer.Core.Data;

namespace ReportServer.Execution;

public interface ISqlQueryExecutor
{
    Task<DatasetResult> ExecuteAsync(DatasetDefinition dataset, ResolvedDatasource datasource, IReadOnlyDictionary<string, object?> parameters, ExecutionLimits limits, CancellationToken ct);
}
