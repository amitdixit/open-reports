using ReportServer.Core.Items;
using ReportServer.Core.Layout;

namespace ReportServer.Rendering;

public sealed class BandLayoutEngine
{
    public IEnumerable<RenderNode> LayoutStaticBand(BandDefinition band, double offsetY)
    {
        foreach (var item in band.Items)
        {
            yield return new RenderNode
            {
                Type = item.Type,
                X = item.X,
                Y = offsetY + item.Y,
                Width = item.Width,
                Height = item.Height,
                Text = item is TextBoxItemDefinition tb ? tb.Value : null,
                Style = item.Style
            };
        }
    }

    public IEnumerable<RenderNode> LayoutDetailRow(BandDefinition band, IReadOnlyDictionary<string, object?> row, double offsetY)
    {
        foreach (var item in band.Items)
        {
            var text = item switch
            {
                TextBoxItemDefinition tb => EvaluateText(tb.Value, row),
                _ => null
            };

            yield return new RenderNode
            {
                Type = item.Type,
                X = item.X,
                Y = offsetY + item.Y,
                Width = item.Width,
                Height = item.Height,
                Text = text,
                Style = item.Style
            };
        }
    }

    private static string? EvaluateText(string expression, IReadOnlyDictionary<string, object?> row)
    {
        if (expression.StartsWith("=Fields.", StringComparison.Ordinal))
        {
            var field = expression.Substring("=Fields.".Length);
            return row.TryGetValue(field, out var v) ? v?.ToString() : null;
        }
        return expression;
    }
}
