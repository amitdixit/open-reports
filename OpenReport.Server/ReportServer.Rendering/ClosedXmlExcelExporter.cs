using ClosedXML.Excel;


namespace ReportServer.Rendering.Excel;

public sealed class ClosedXmlExcelExporter : IExcelExporter
{
    public byte[] Export(RenderDocument document)
    {
        using var workbook = new XLWorkbook();
        var sheet = workbook.AddWorksheet("Report");

        var currentRow = 1;

        foreach (var page in document.Pages)
        {
            foreach (var node in page.Nodes)
            {
                if (string.IsNullOrWhiteSpace(node.Text))
                    continue;

                sheet.Cell(currentRow, 1).Value = node.Text;
                currentRow++;
            }
        }

        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }
}
