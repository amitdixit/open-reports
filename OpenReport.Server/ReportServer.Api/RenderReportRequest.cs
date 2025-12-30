namespace ReportServer.Api.Contracts;

public sealed class RenderReportRequest
{
    public Dictionary<string, object?> Parameters { get; init; } = new();
}
