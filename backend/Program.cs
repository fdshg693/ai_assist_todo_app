var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
// CORS設定を追加
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();

// 開発環境ではHTTPSリダイレクトを無効化
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.MapGet("/api/hello", () =>
{
    return new { message = "Hello from Backend!" };
});

app.Run();
