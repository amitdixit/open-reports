namespace ReportServer.Rendering.Excel;

public interface IExcelExporter
{
    byte[] Export(RenderDocument document);
}
