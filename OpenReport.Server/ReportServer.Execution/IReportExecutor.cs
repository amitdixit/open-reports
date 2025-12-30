using ReportServer.Core.Reports;

namespace ReportServer.Execution;



public interface IReportExecutor
{
    Task<ReportExecutionContext> ExecuteAsync(ReportDefinition report, IReadOnlyDictionary<string, object?> parameters, CancellationToken ct);
}


public interface IReportValidator
{
}
