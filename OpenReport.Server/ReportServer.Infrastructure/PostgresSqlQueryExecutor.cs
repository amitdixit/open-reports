using Npgsql;
using ReportServer.Core.Data;
using ReportServer.Execution;

namespace ReportServer.Infrastructure.Execution;

public sealed class PostgresSqlQueryExecutor : ISqlQueryExecutor
{
    public async Task<DatasetResult> ExecuteAsync(DatasetDefinition dataset, ResolvedDatasource datasource,
        IReadOnlyDictionary<string, object?> parameters, ExecutionLimits limits, CancellationToken ct)
    {
        await using var conn = new NpgsqlConnection(datasource.ConnectionString);
        await conn.OpenAsync(ct);

        await using var cmd = new NpgsqlCommand(dataset.Query.Text, conn)
        {
            CommandTimeout = limits.CommandTimeoutSeconds
        };

        foreach (var param in dataset.Parameters)
        {
            var value = parameters[param.ReportParameter];
            cmd.Parameters.AddWithValue(param.Name, value ?? DBNull.Value);
        }

        await using var reader = await cmd.ExecuteReaderAsync(ct);

        var rows = new List<IReadOnlyDictionary<string, object?>>();
        var rowCount = 0;

        while (await reader.ReadAsync(ct))
        {
            if (++rowCount > limits.MaxRows)
            {
                throw new InvalidOperationException($"Dataset '{dataset.Name}' exceeded max rows limit ({limits.MaxRows}).");
            }

            var row = new Dictionary<string, object?>(dataset.Fields.Count);
            foreach (var field in dataset.Fields)
            {
                row[field.Name] = reader[field.Name];
            }

            rows.Add(row);
        }

        return new DatasetResult(dataset.Name, dataset.Fields, rows);
    }
}
