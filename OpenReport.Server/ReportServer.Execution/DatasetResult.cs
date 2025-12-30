using ReportServer.Core.Data;

namespace ReportServer.Execution;

public sealed class DatasetResult
{
    public string DatasetName { get; }
    public IReadOnlyList<FieldDefinition> Fields { get; }
    public IReadOnlyList<IReadOnlyDictionary<string, object?>> Rows { get; }

    public DatasetResult(
        string datasetName,
        IReadOnlyList<FieldDefinition> fields,
        IReadOnlyList<IReadOnlyDictionary<string, object?>> rows)
    {
        DatasetName = datasetName;
        Fields = fields;
        Rows = rows;
    }
}
