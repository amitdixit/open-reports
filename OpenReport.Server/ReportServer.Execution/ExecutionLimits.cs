namespace ReportServer.Execution;

public sealed class ExecutionLimits
{
    /// <summary>Maximum seconds a dataset command may run.</summary>
    public int CommandTimeoutSeconds { get; init; } = 30;

    /// <summary>Hard cap on rows returned per dataset.</summary>
    public int MaxRows { get; init; } = 100_000;
}