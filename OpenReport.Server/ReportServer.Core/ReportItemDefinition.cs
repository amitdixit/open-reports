namespace ReportServer.Core.Items;

public abstract record ReportItemDefinition
{
    public string Id { get; init; } = default!;
    public string Type { get; init; } = default!;

    public double X { get; init; }
    public double Y { get; init; }
    public double Width { get; init; }
    public double Height { get; init; }

    public IReadOnlyDictionary<string, object>? Style { get; init; }
}



public sealed record TextBoxItemDefinition : ReportItemDefinition
{
    public string Value { get; init; } = default!;
}
