using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReportServer.Infrastructure.Persistence.Entities;

[Table("reports")]
public sealed class ReportEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;

    public string SchemaVersion { get; set; } = default!;

    public string DefinitionJson { get; set; } = default!;

    public DateTime CreatedAtUtc { get; set; }

    public DateTime ModifiedAtUtc { get; set; }
}

public class ReportEntityConfiguration : IEntityTypeConfiguration<ReportEntity>
{
    public void Configure(EntityTypeBuilder<ReportEntity> builder)
    {
        builder.ToTable("reports");

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).HasColumnName("id");
        builder.Property(e => e.Name).IsRequired().HasColumnName("name");
        builder.Property(e => e.SchemaVersion).IsRequired().HasColumnName("schema_version");
        builder.Property(e => e.DefinitionJson).IsRequired()
              .HasColumnName("definition_json")
              .HasColumnType("jsonb");

        builder.Property(e => e.CreatedAtUtc).HasColumnName("created_at_utc");
        builder.Property(e => e.ModifiedAtUtc).HasColumnName("modified_at_utc");
    }
}
