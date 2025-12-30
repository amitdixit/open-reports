using ReportServer.Core.Items;
using ReportServer.Core.Layout;
using ReportServer.Execution;

namespace ReportServer.Rendering;

public sealed class ReportRenderer : IReportRenderer
{
    public RenderDocument Render(ReportExecutionContext context)
    {
        var nodes = new List<RenderNode>();

        foreach (var band in context.Report.Bands)
        {
            if (band.Dataset is null)
            {
                RenderStaticBand(band, nodes);
            }
            else
            {
                RenderDatasetBand(band, context, nodes);
            }
        }

        var page = new RenderPage(1, nodes);
        return new RenderDocument(new[] { page });
    }

    private static void RenderStaticBand(
        BandDefinition band,
        List<RenderNode> nodes)
    {
        foreach (var item in band.Items)
        {
            nodes.Add(RenderItem(item, null));
        }
    }

    private static void RenderDatasetBand(
        BandDefinition band,
        ReportExecutionContext context,
        List<RenderNode> nodes)
    {
        if (!context.Datasets.TryGetValue(band.Dataset!, out var dataset))
            throw new InvalidOperationException(
                $"Dataset '{band.Dataset}' not found for band.");

        foreach (var row in dataset.Rows)
        {
            foreach (var item in band.Items)
            {
                nodes.Add(RenderItem(item, row));
            }
        }
    }

    private static RenderNode RenderItem(
        ReportItemDefinition item,
        IReadOnlyDictionary<string, object?>? row)
    {
        string? text = item switch
        {
            TextBoxItemDefinition tb => EvaluateText(tb.Value, row),
            _ => null
        };

        return new RenderNode(
            item.Type,
            item.X,
            item.Y,
            item.Width,
            item.Height,
            text,
            item.Style);
    }

    private static string? EvaluateText(
        string expression,
        IReadOnlyDictionary<string, object?>? row)
    {
        // VERY basic v1
        if (row is null)
            return expression;

        if (expression.StartsWith("=Fields.", StringComparison.Ordinal))
        {
            var field = expression.Substring("=Fields.".Length);
            return row.TryGetValue(field, out var value)
                ? value?.ToString()
                : null;
        }

        return expression;
    }
}
