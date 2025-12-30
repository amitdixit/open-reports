using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReportServer.Infrastructure.Serialization;

public static class ReportJsonOptions
{
    public static JsonSerializerOptions Create()
    {
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        };

        options.Converters.Add(new ReportItemJsonConverter());

        return options;
    }
}
