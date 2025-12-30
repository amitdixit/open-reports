namespace ReportServer.Rendering;

public sealed class RenderPage
{
    public int PageNumber { get; }
    public IReadOnlyList<RenderNode> Nodes { get; }

    public RenderPage(int pageNumber, IReadOnlyList<RenderNode> nodes)
    {
        PageNumber = pageNumber;
        Nodes = nodes;
    }
}
