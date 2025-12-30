using ReportServer.Core.Reports;

namespace ReportServer.Infrastructure.Persistence;

public interface IReportRepository
{
    Task<ReportDefinition> GetAsync(Guid id, CancellationToken ct);
    Task<IReadOnlyList<(Guid Id, string Name)>> ListAsync(CancellationToken ct);
    Task SaveAsync(ReportDefinition report, CancellationToken ct);
    Task DeleteAsync(Guid id, CancellationToken ct);
}
