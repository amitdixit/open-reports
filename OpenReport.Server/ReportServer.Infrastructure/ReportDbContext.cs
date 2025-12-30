using Microsoft.EntityFrameworkCore;
using ReportServer.Infrastructure.Persistence.Entities;

namespace ReportServer.Infrastructure.Persistence;

public sealed class ReportDbContext : DbContext
{
    public ReportDbContext(DbContextOptions<ReportDbContext> options) : base(options)
    {
    }

    public DbSet<ReportEntity> Reports => Set<ReportEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //modelBuilder.Entity<ReportEntity>(entity =>
        //{
        //    entity.ToTable("reports");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.Name).HasColumnName("name");
        //    entity.Property(e => e.SchemaVersion).HasColumnName("schema_version");
        //    entity.Property(e => e.DefinitionJson)
        //          .HasColumnName("definition_json")
        //          .HasColumnType("jsonb");

        //    entity.Property(e => e.CreatedAtUtc).HasColumnName("created_at_utc");
        //    entity.Property(e => e.ModifiedAtUtc).HasColumnName("modified_at_utc");
        //});

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ReportEntity).Assembly);

    }
}
