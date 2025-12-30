namespace ReportServer.Core.Layout;

public sealed record PageDefinition
{
    public string Size { get; init; } = "A4";
    public string Orientation { get; init; } = "Portrait";

    public double Width { get; init; }
    public double Height { get; init; }
    public string Unit { get; init; } = "mm";

    public PageMargins Margins { get; init; } = default!;
}

public sealed record PageMargins
{
    public double Top { get; init; }
    public double Right { get; init; }
    public double Bottom { get; init; }
    public double Left { get; init; }
}
