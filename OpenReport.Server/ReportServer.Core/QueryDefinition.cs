namespace ReportServer.Core.Data;

public sealed record QueryDefinition
{
    public string Type { get; init; } = "sql";
    public string Dialect { get; init; } = default!;
    public string Text { get; init; } = default!;
}
