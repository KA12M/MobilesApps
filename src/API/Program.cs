using MediatR;
using API.Middleware;
using Application.Interfaces;
using Application.Image;
using Microsoft.Extensions.ML;
using MLDiabetesService;
using Application.Utils;
using Microsoft.EntityFrameworkCore;
using Domain;
using Application.Core;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. 
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithOrigins("http://10.103.0.15", "http://coms.kru.ac.th", "http://localhost:5173", "http://localhost:3000");
    });
});

builder.Services.AddScoped<IUploadFileAccessor, UploadFileAccessor>();
builder.Services.AddScoped<IDiabetesAccessor, DiabetesAccessor>();

builder.Services.AddMediatR(typeof(UploadOne.Command).Assembly);

builder.Services.AddPredictionEnginePool<MLDiabetes.ModelInput, MLDiabetes.ModelOutput>().FromFile("MLDiabetes.zip");

builder.Services.AddDbContext<DataContext>(options =>
{
    //options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection"));
    options.UseSqlite(builder.Configuration.GetConnectionString("DbConnection"));
});

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("CorsPolicy");

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
