namespace ReportServer.Rendering;

public class Class1
{

}
/*

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using ReportServer.Rendering;

namespace ReportServer.Rendering.Pdf;

public sealed class QuestPdfExporter : IPdfExporter
{
    public byte[] Export(RenderDocument document)
    {
        return Document.Create(container =>
        {
            foreach (var renderPage in document.Pages)
            {
                container.Page(page =>
                {
                    page.Margin(0);

                    page.Content().Canvas((canvas, _) =>
                    {
                        foreach (var node in renderPage.Nodes)
                        {
                            DrawNode(canvas, node);
                        }
                    });
                });
            }
        }).GeneratePdf();
    }

    private static void DrawNode(
        QuestPDF.Drawing.Canvas canvas,
        RenderNode node)
    {
        if (!string.IsNullOrWhiteSpace(node.Text))
        {
            canvas.DrawText(
                node.Text,
                (float)node.X,
                (float)node.Y,
                text =>
                {
                    text.FontSize(10);
                    text.FontColor(Colors.Black);
                });
        }
    }
}

*/