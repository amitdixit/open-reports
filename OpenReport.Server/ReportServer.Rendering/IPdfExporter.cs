namespace ReportServer.Rendering.Pdf;

public interface IPdfExporter
{
    byte[] Export(RenderDocument document);
}


