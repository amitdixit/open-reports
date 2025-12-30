namespace ReportServer.Rendering;

public sealed record RenderNode
{
    public string Type { get; init; } = default!;
    public double X { get; init; }
    public double Y { get; init; }
    public double Width { get; init; }
    public double Height { get; init; }
    public string? Text { get; init; }
    public IReadOnlyDictionary<string, object>? Style { get; init; }
}
