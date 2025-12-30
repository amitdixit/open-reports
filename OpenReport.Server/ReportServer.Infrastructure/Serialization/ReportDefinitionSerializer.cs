using ReportServer.Core.Reports;
using System.Text.Json;

namespace ReportServer.Infrastructure.Serialization;

public static class ReportDefinitionSerializer
{
    public static string Serialize(ReportDefinition report) => JsonSerializer.Serialize(report, ReportJsonOptions.Create());

    public static ReportDefinition Deserialize(string json) => JsonSerializer.Deserialize<ReportDefinition>(
            json,
            ReportJsonOptions.Create()
        )!;
}
