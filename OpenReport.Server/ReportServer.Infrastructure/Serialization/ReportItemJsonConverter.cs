using ReportServer.Core.Items;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReportServer.Infrastructure.Serialization;

public sealed class ReportItemJsonConverter : JsonConverter<ReportItemDefinition>
{
    public override ReportItemDefinition Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        using var document = JsonDocument.ParseValue(ref reader);

        if (!document.RootElement.TryGetProperty("type", out var typeProperty))
            throw new JsonException("Report item is missing required 'type' property.");

        var typeDiscriminator = typeProperty.GetString();

        if (string.IsNullOrWhiteSpace(typeDiscriminator))
            throw new JsonException("Report item 'type' property is empty.");

        var json = document.RootElement.GetRawText();

        return typeDiscriminator switch
        {
            "TextBox" => JsonSerializer.Deserialize<TextBoxItemDefinition>(json, options)!,

            // future item types go here
            // "Image" => JsonSerializer.Deserialize<ImageItemDefinition>(json, options)!,

            _ => throw new JsonException(
                $"Unsupported report item type '{typeDiscriminator}'.")
        };
    }

    public override void Write(
        Utf8JsonWriter writer,
        ReportItemDefinition value,
        JsonSerializerOptions options)
    {
        switch (value)
        {
            case TextBoxItemDefinition textBox:
                JsonSerializer.Serialize(writer, textBox, options);
                break;

            // future item types go here

            default:
                throw new JsonException(
                    $"Unsupported report item runtime type '{value.GetType().Name}'.");
        }
    }
}
