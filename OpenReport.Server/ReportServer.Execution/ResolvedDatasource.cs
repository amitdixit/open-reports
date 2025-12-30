namespace ReportServer.Execution;

public sealed class ResolvedDatasource
{
    public string Provider { get; }
    public string ConnectionString { get; }

    public ResolvedDatasource(string provider, string connectionString)
    {
        Provider = provider;
        ConnectionString = connectionString;
    }
}
