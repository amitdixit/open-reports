using ReportServer.Core.Data;

namespace ReportServer.Execution;

public sealed class DatasetExecutor : IDatasetExecutor
{
    private readonly IDatasourceResolver _datasourceResolver;
    private readonly ISqlQueryExecutor _sqlExecutor;
    private readonly ExecutionLimits _limits;

    public DatasetExecutor(IDatasourceResolver datasourceResolver, ISqlQueryExecutor sqlExecutor, ExecutionLimits limits)
    {
        _datasourceResolver = datasourceResolver;
        _sqlExecutor = sqlExecutor;
        _limits = limits;
    }

    public async Task<DatasetResult> ExecuteAsync(DatasetDefinition dataset, IReadOnlyDictionary<string, object?> reportParameters, CancellationToken ct)
    {
        foreach (var param in dataset.Parameters)
        {
            if (!reportParameters.ContainsKey(param.ReportParameter))
                throw new InvalidOperationException($"Dataset '{dataset.Name}' missing parameter '{param.ReportParameter}'.");
        }

        var datasource = await _datasourceResolver.ResolveAsync(new DatasourceReference { Name = dataset.Datasource }, ct);

        return await _sqlExecutor.ExecuteAsync(dataset, datasource, reportParameters, _limits, ct);
    }
}
