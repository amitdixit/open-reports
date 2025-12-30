namespace ReportServer.Rendering;

public sealed class PaginationContext
{
    public double PageWidth { get; init; }
    public double PageHeight { get; init; }
    public double MarginTop { get; init; }
    public double MarginBottom { get; init; }
    public double CursorY { get; private set; }

    public double RemainingHeight => PageHeight - MarginBottom - CursorY;

    public void Advance(double height)
    {
        CursorY += height;
    }

    public void ResetForNewPage()
    {
        CursorY = MarginTop;
    }
}
