namespace ReportServer.Core.Data;

public sealed record DatasourceReference
{
    public string Name { get; init; } = default!;
    public string Type { get; init; } = default!;
    public Guid ReferenceId { get; init; }
}
