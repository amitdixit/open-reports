namespace ReportServer.Core.Data;

public sealed record DatasetParameterDefinition
{
    public string Name { get; init; } = default!;
    public string Source { get; init; } = "report";
    public string ReportParameter { get; init; } = default!;
    public string Type { get; init; } = default!;
}
