using ReportServer.Execution;

namespace ReportServer.Rendering;

public sealed class RenderPipeline
{
    private readonly ReportRenderer _renderer;
    private readonly PaginationEngine _paginator;

    public RenderPipeline(ReportRenderer renderer, PaginationEngine paginator)
    {
        _renderer = renderer;
        _paginator = paginator;
    }

    public RenderDocument Render(ReportExecutionContext context)
    {
        var nodes = _renderer.RenderNodes(context);
        return _paginator.Paginate(context.Report.Page, nodes);
    }
}
