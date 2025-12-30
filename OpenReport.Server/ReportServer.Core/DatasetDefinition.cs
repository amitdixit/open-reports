namespace ReportServer.Core.Data;

public sealed record DatasetDefinition
{
    public string Name { get; init; } = default!;
    public string Datasource { get; init; } = default!;

    public QueryDefinition Query { get; init; } = default!;
    public IReadOnlyList<DatasetParameterDefinition> Parameters { get; init; } = [];
    public IReadOnlyList<FieldDefinition> Fields { get; init; } = [];
}
