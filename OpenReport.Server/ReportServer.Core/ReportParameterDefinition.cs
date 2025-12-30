namespace ReportServer.Core.Parameters;

public sealed record ReportParameterDefinition
{
    public string Name { get; init; } = default!;

    // string, int, decimal, date, bool, etc.
    public string Type { get; init; } = default!;

    public bool Nullable { get; init; }

    // Stored as string to keep definition pure & JSON-friendly
    public string? DefaultValue { get; init; }

    // Optional UI / metadata hint, ignored by execution if absent
    public string? Prompt { get; init; }
}
