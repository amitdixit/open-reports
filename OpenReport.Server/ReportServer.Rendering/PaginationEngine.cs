using ReportServer.Core.Layout;
using ReportServer.Rendering;

public sealed class PaginationEngine
{
    public RenderDocument Paginate(
        PageDefinition page,
        IReadOnlyList<RenderNode> nodes)
    {
        var reportHeader = nodes.Where(n => n.BandRole == RenderBandRole.ReportHeader).ToList();
        var pageHeader = nodes.Where(n => n.BandRole == RenderBandRole.PageHeader).ToList();
        var detail = nodes.Where(n => n.BandRole == RenderBandRole.Detail).ToList();
        var pageFooter = nodes.Where(n => n.BandRole == RenderBandRole.PageFooter).ToList();
        var reportFooter = nodes.Where(n => n.BandRole == RenderBandRole.ReportFooter).ToList();

        var pages = new List<RenderPage>();
        var pageNo = 1;

        var cursorStart = page.Margins.Top +
                          pageHeader.Sum(h => h.Height);

        var cursorEnd = page.Height -
                        page.Margins.Bottom -
                        pageFooter.Sum(f => f.Height);

        // Render ReportHeader ONCE
        var currentNodes = new List<RenderNode>();
        currentNodes.AddRange(ShiftY(reportHeader, page.Margins.Top));

        var cursorY = cursorStart;

        foreach (var node in detail)
        {
            if (cursorY + node.Height > cursorEnd)
            {
                // close page
                currentNodes.AddRange(ShiftY(pageFooter, cursorEnd));
                pages.Add(new RenderPage(pageNo++, currentNodes));

                // new page
                currentNodes = new List<RenderNode>();
                currentNodes.AddRange(ShiftY(pageHeader, page.Margins.Top));
                cursorY = cursorStart;
            }

            currentNodes.Add(node with { Y = cursorY });
            cursorY += node.Height;
        }

        // last page footer
        currentNodes.AddRange(ShiftY(pageFooter, cursorEnd));

        // ReportFooter ONCE
        currentNodes.AddRange(ShiftY(reportFooter, cursorY));

        pages.Add(new RenderPage(pageNo, currentNodes));

        return new RenderDocument(pages);
    }

    private static IEnumerable<RenderNode> ShiftY(
        IEnumerable<RenderNode> nodes,
        double startY)
    {
        var y = startY;
        foreach (var n in nodes)
        {
            yield return n with { Y = y };
            y += n.Height;
        }
    }
}
