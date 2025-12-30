namespace ReportServer.Rendering.Pdf;

public sealed class StubPdfExporter : IPdfExporter
{
    public byte[] Export(RenderDocument document)
    {
        // Explicit stub – useful for testing integration paths
        return Array.Empty<byte>();
    }
}
