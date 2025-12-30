using ReportServer.Core.Reports;

namespace ReportServer.Execution;

public sealed class ReportExecutionContext
{
    private readonly Dictionary<string, DatasetResult> _datasets = [];
    public Guid ExecutionId { get; } = Guid.NewGuid();

    public ReportDefinition Report { get; }
    public IReadOnlyDictionary<string, object?> Parameters { get; }

    public DateTime StartedAtUtc { get; } = DateTime.UtcNow;

    public ReportExecutionContext(ReportDefinition report, IReadOnlyDictionary<string, object?> parameters)
    {
        Report = report;
        Parameters = parameters;
    }

    public void AddDataset(DatasetResult result)
    {
        _datasets[result.DatasetName] = result;
    }
}
