namespace ReportServer.Rendering;

public sealed class RenderDocument
{
    public IReadOnlyList<RenderPage> Pages { get; }

    public RenderDocument(IReadOnlyList<RenderPage> pages)
    {
        Pages = pages;
    }
}