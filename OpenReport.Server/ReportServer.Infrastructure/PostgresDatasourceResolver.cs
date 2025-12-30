using Microsoft.Extensions.Configuration;
using ReportServer.Core.Data;
using ReportServer.Execution;

namespace ReportServer.Infrastructure.DataSources;

public sealed class PostgresDatasourceResolver : IDatasourceResolver
{
    private readonly IConfiguration _configuration;

    public PostgresDatasourceResolver(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public Task<ResolvedDatasource> ResolveAsync(DatasourceReference datasource, CancellationToken ct)
    {
        // Later: lookup from DB / secrets store
        var connString = _configuration.GetConnectionString(datasource.Name);

        if (string.IsNullOrWhiteSpace(connString))
            throw new InvalidOperationException($"Datasource '{datasource.Name}' not found.");

        return Task.FromResult(new ResolvedDatasource("postgresql", connString));
    }
}
