namespace ReportServer.Core.Data;

public sealed record FieldDefinition
{
    public string Name { get; init; } = default!;
    public string Type { get; init; } = default!;
}
