using ReportServer.Core.Reports;

namespace ReportServer.Execution;

public sealed class ReportExecutor : IReportExecutor
{
    private readonly IDatasetExecutor _datasetExecutor;

    public ReportExecutor(IDatasetExecutor datasetExecutor)
    {
        _datasetExecutor = datasetExecutor;
    }

    public async Task<ReportExecutionContext> ExecuteAsync(ReportDefinition report, IReadOnlyDictionary<string, object?> parameters, CancellationToken ct)
    {
        ValidateParameters(report, parameters);

        var context = new ReportExecutionContext(report, parameters);

        // Execute datasets
        foreach (var dataset in report.Datasets)
        {
            var result = await _datasetExecutor.ExecuteAsync(
                dataset,
                parameters,
                ct);

            context.AddDataset(result);
        }

        return context;
    }

    private static void ValidateParameters(ReportDefinition report, IReadOnlyDictionary<string, object?> parameters)
    {
        foreach (var param in report.Parameters)
        {
            if (!parameters.ContainsKey(param.Name))
            {
                throw new InvalidOperationException($"Missing required parameter '{param.Name}'.");
            }
        }
    }
}
