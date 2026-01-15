using Backend.Services;

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

// TodoServiceをシングルトンとして登録
builder.Services.AddSingleton<TodoService>();

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

// Todo API エンドポイント
app.MapGet("/api/todos", (TodoService todoService) =>
{
    return todoService.GetAll();
});

app.MapGet("/api/todos/{id}", (int id, TodoService todoService) =>
{
    var todo = todoService.GetById(id);
    return todo is not null ? Results.Ok(todo) : Results.NotFound();
});

app.MapPost("/api/todos", (CreateTodoRequest request, TodoService todoService) =>
{
    var todo = todoService.Create(request.Title);
    return Results.Created($"/api/todos/{todo.Id}", todo);
});

app.MapPut("/api/todos/{id}", (int id, UpdateTodoRequest request, TodoService todoService) =>
{
    var todo = todoService.Update(id, request.Title, request.IsCompleted);
    return todo is not null ? Results.Ok(todo) : Results.NotFound();
});

app.MapDelete("/api/todos/{id}", (int id, TodoService todoService) =>
{
    var deleted = todoService.Delete(id);
    return deleted ? Results.NoContent() : Results.NotFound();
});

app.Run();

// リクエストDTO
record CreateTodoRequest(string Title);
record UpdateTodoRequest(string? Title, bool? IsCompleted);
