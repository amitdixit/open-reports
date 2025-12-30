using Microsoft.EntityFrameworkCore;
using ReportServer.Core.Reports;
using ReportServer.Infrastructure.Persistence.Entities;
using ReportServer.Infrastructure.Serialization;

namespace ReportServer.Infrastructure.Persistence;

public sealed class ReportRepository : IReportRepository
{
    private readonly ReportDbContext _db;

    public ReportRepository(ReportDbContext db)
    {
        _db = db;
    }

    public async Task<ReportDefinition> GetAsync(Guid id, CancellationToken ct)
    {
        var entity = await _db.Reports
            .AsNoTracking()
            .SingleOrDefaultAsync(r => r.Id == id, ct);

        if (entity is null)
            throw new InvalidOperationException($"Report '{id}' not found.");

        return ReportDefinitionSerializer.Deserialize(entity.DefinitionJson);
    }

    public async Task<IReadOnlyList<(Guid Id, string Name)>> ListAsync(CancellationToken ct)
    {
        return await _db.Reports
            .AsNoTracking()
            .OrderBy(r => r.Name)
            .Select(r => new ValueTuple<Guid, string>(r.Id, r.Name))
            .ToListAsync(ct);
    }

    public async Task SaveAsync(ReportDefinition report, CancellationToken ct)
    {
        var json = ReportDefinitionSerializer.Serialize(report);

        var existing = await _db.Reports
            .SingleOrDefaultAsync(r => r.Id == report.ReportId, ct);

        if (existing is null)
        {
            var entity = new ReportEntity
            {
                Id = report.ReportId,
                Name = report.Name,
                SchemaVersion = report.SchemaVersion,
                DefinitionJson = json,
                CreatedAtUtc = DateTime.UtcNow,
                ModifiedAtUtc = DateTime.UtcNow
            };

            _db.Reports.Add(entity);
        }
        else
        {
            existing.Name = report.Name;
            existing.SchemaVersion = report.SchemaVersion;
            existing.DefinitionJson = json;
            existing.ModifiedAtUtc = DateTime.UtcNow;
        }

        await _db.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct)
    {
        var entity = await _db.Reports
            .SingleOrDefaultAsync(r => r.Id == id, ct);

        if (entity is null)
            return;

        _db.Reports.Remove(entity);
        await _db.SaveChangesAsync(ct);
    }
}
