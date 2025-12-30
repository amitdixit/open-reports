using ReportServer.Core.Data;

namespace ReportServer.Execution;

public interface IDatasetExecutor
{
    Task<DatasetResult> ExecuteAsync(DatasetDefinition dataset, IReadOnlyDictionary<string, object?> reportParameters, CancellationToken ct);
}
