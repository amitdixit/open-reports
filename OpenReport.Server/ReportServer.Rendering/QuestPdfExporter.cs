using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace ReportServer.Rendering.Pdf;

public sealed class QuestPdfExporter : IPdfExporter
{
    public byte[] Export(RenderDocument document)
    {
        QuestPDF.Settings.License = LicenseType.Community;
        return Document.Create(container =>
        {
            foreach (var renderPage in document.Pages)
            {
                container.Page(page =>
                {
                    page.Margin(20);

                    page.Content().Column(column =>
                    {
                        foreach (var node in renderPage.Nodes)
                        {
                            if (!string.IsNullOrWhiteSpace(node.Text))
                            {
                                column.Item().Text(node.Text);
                            }
                        }
                    });
                });
            }
        }).GeneratePdf();
    }
}
