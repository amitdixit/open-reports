using ReportServer.Core.Items;
using ReportServer.Core.Layout;
using ReportServer.Execution;

namespace ReportServer.Rendering;

public sealed class ReportRenderer : IReportRenderer
{
    public RenderDocument Render(ReportExecutionContext context)
    {
        var nodes = RenderNodes(context);
        return new RenderDocument([new RenderPage(1, nodes)]);
    }


    private static void RenderStaticBand(BandDefinition band, List<RenderNode> nodes)
    {
        foreach (var item in band.Items)
        {
            nodes.Add(RenderItem(item, band.Type, null));
        }
    }

    private static void RenderDatasetBand(BandDefinition band, ReportExecutionContext context, List<RenderNode> nodes)
    {
        if (!context.Datasets.TryGetValue(band.Dataset!, out var dataset))
            throw new InvalidOperationException($"Dataset '{band.Dataset}' not found for band.");

        foreach (var row in dataset.Rows)
        {
            foreach (var item in band.Items)
            {
                nodes.Add(RenderItem(item, band.Type, row));
            }
        }
    }

    private static RenderBandRole MapRole(string bandType) => bandType switch
    {
        "ReportHeader" => RenderBandRole.ReportHeader,
        "PageHeader" => RenderBandRole.PageHeader,
        "PageFooter" => RenderBandRole.PageFooter,
        "ReportFooter" => RenderBandRole.ReportFooter,
        _ => RenderBandRole.Detail
    };


    private static RenderNode RenderItem(ReportItemDefinition item, string bandType, IReadOnlyDictionary<string, object?>? row)
    {
        string? text = item switch
        {
            TextBoxItemDefinition tb => EvaluateText(tb.Value, row),
            _ => null
        };

        return new RenderNode
        {
            Type = item.Type,
            BandRole = MapRole(bandType),
            X = item.X,
            Y = item.Y,
            Width = item.Width,
            Height = item.Height,
            Text = text,
            Style = item.Style
        };
    }

    private static string? EvaluateText(string expression, IReadOnlyDictionary<string, object?>? row)
    {
        // VERY basic v1
        if (row is null)
            return expression;

        if (expression.StartsWith("=Fields.", StringComparison.Ordinal))
        {
            var field = expression["=Fields.".Length..];
            return row.TryGetValue(field, out var value) ? value?.ToString() : null;
        }

        return expression;
    }

    internal IReadOnlyList<RenderNode> RenderNodes(ReportExecutionContext context)
    {
        var nodes = new List<RenderNode>();

        foreach (var band in context.Report.Bands)
        {
            if (band.Dataset is null)
                RenderStaticBand(band, nodes);
            else
                RenderDatasetBand(band, context, nodes);
        }

        return nodes;
    }

}
