using Microsoft.EntityFrameworkCore;
using ReportServer.Api.Contracts;
using ReportServer.Core.Items;
using ReportServer.Core.Layout;
using ReportServer.Core.Reports;
using ReportServer.Execution;
using ReportServer.Infrastructure.DataSources;
using ReportServer.Infrastructure.Execution;
using ReportServer.Infrastructure.Persistence;
using ReportServer.Rendering;
using ReportServer.Rendering.Excel;
using ReportServer.Rendering.Pdf;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ReportDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("ReportDb"));
});

builder.Services.AddScoped<IReportRenderer, ReportRenderer>();
builder.Services.AddScoped<RenderPipeline>();
builder.Services.AddScoped<IReportRepository, ReportRepository>();
builder.Services.AddScoped<IReportExecutor, ReportExecutor>();
builder.Services.AddScoped<IDatasetExecutor, DatasetExecutor>();
builder.Services.AddScoped<ReportRenderer>();
builder.Services.AddScoped<PaginationEngine>();
builder.Services.AddScoped<IDatasourceResolver, PostgresDatasourceResolver>();
builder.Services.AddScoped<ISqlQueryExecutor, PostgresSqlQueryExecutor>();
builder.Services.AddScoped<IDatasetExecutor, DatasetExecutor>();
builder.Services.AddSingleton(new ExecutionLimits { CommandTimeoutSeconds = 30, MaxRows = 100_000 });
builder.Services.AddScoped<IExcelExporter, ClosedXmlExcelExporter>();
builder.Services.AddScoped<IPdfExporter, QuestPdfExporter>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", async (IReportRepository repo) =>
{
    var report = new ReportDefinition
    {
        ReportId = Guid.NewGuid(),
        Name = "Test",
        Page = new PageDefinition
        {
            Width = 210,
            Height = 297,
            Margins = new PageMargins
            {
                Top = 10,
                Right = 10,
                Bottom = 10,
                Left = 10
            }
        },
        Bands =
    [
        new BandDefinition
        {
            Type = "Detail",
            Height = 20,
            Items =
            [
                new TextBoxItemDefinition
                {
                    Id = "txt1",
                    Type = "TextBox",
                    X = 10,
                    Y = 5,
                    Width = 100,
                    Height = 15,
                    Value = "=Fields.amount"
                }
            ]
        }
    ]
    };





    await repo.SaveAsync(report, CancellationToken.None);

    var loaded = await repo.GetAsync(report.ReportId, CancellationToken.None);
    //var json1 = ReportDefinitionSerializer.Serialize(report);
    //var json2 = ReportDefinitionSerializer.Serialize(loaded);

    //using var doc1 = JsonDocument.Parse(json1);
    //using var doc2 = JsonDocument.Parse(json2);

    //if (!JsonElement.DeepEquals(doc1.RootElement, doc2.RootElement))
    //{
    //    throw new Exception("Persistence round-trip failed.");
    //}


    return Results.Ok();
})
.WithName("GetWeatherForecast");



app.MapPost(
    "/api/reports/{reportId:guid}/render",
    async (
        Guid reportId,
        string format,
        RenderReportRequest request,
        IReportRepository reportRepository,
        IReportExecutor reportExecutor,
        RenderPipeline renderPipeline,
        IPdfExporter pdfExporter,
        IExcelExporter excelExporter,
        CancellationToken ct) =>
    {
        // 1. Load report
        var report = await reportRepository.GetAsync(reportId, ct);

        // 2. Execute
        var executionContext = await reportExecutor.ExecuteAsync(
            report,
            request.Parameters,
            ct);

        // 3. Render (renderer + pagination handled internally)
        var document = renderPipeline.Render(executionContext);

        // 4. Export
        byte[] output;
        string contentType;
        string fileName;

        switch (format.ToLowerInvariant())
        {
            case "pdf":
                output = pdfExporter.Export(document);
                contentType = "application/pdf";
                fileName = $"{report.Name}.pdf";
                break;

            case "excel":
                output = excelExporter.Export(document);
                contentType =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                fileName = $"{report.Name}.xlsx";
                break;

            default:
                return Results.BadRequest("Unsupported format.");
        }

        return Results.File(output, contentType, fileName);
    });






await app.RunAsync();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
