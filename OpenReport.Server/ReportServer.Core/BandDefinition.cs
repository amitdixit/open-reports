using ReportServer.Core.Items;

namespace ReportServer.Core.Layout;

public sealed record BandDefinition
{
    public string Type { get; init; } = default!; // ReportHeader, Detail, etc.
    public string? Dataset { get; init; }
    public double Height { get; init; }

    public IReadOnlyList<ReportItemDefinition> Items { get; init; } = [];
}
