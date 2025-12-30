using ReportServer.Execution;

namespace ReportServer.Rendering;

public interface IReportRenderer
{
    RenderDocument Render(ReportExecutionContext context);
}
