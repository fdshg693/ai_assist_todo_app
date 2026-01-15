# ASP.NET Core Minimal API

## Purpose
ASP.NET Core Minimal APIは、バックエンドのWeb APIを構築するために使用されています。軽量でシンプルなAPI開発を可能にし、プロトタイプ開発に適しています。

## Role in this Project
- RESTful APIエンドポイントの提供
- TodoのCRUD操作の実装
- フロントエンドとのHTTP通信の窓口
- CORS設定によるクロスオリジン通信の許可
- 依存性注入 (DI) によるサービスの管理

## Current Usage

### Project Configuration
- **フレームワーク**: .NET 10.0
- **プロジェクトタイプ**: Web API
- **ファイル**: `backend/backend.csproj`
- **エントリーポイント**: `backend/Program.cs`

### Dependencies
- `Microsoft.AspNetCore.OpenApi` 10.0.1 - OpenAPI/Swagger サポート

### Service Registration
`Program.cs` でサービスを登録:
```csharp
// CORS設定
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// TodoServiceをシングルトンとして登録
builder.Services.AddSingleton<TodoService>();
```

### API Endpoints
現在実装されているエンドポイント:

```csharp
// ヘルスチェック
app.MapGet("/api/hello", () => new { message = "Hello from Backend!" });

// Todo CRUD
app.MapGet("/api/todos", (TodoService todoService) => todoService.GetAll());
app.MapGet("/api/todos/{id}", (int id, TodoService todoService) => ...);
app.MapPost("/api/todos", (CreateTodoRequest request, TodoService todoService) => ...);
app.MapPut("/api/todos/{id}", (int id, UpdateTodoRequest request, TodoService todoService) => ...);
app.MapDelete("/api/todos/{id}", (int id, TodoService todoService) => ...);
```

### Request/Response DTOs
Record型を使用してシンプルなDTOを定義:
```csharp
record CreateTodoRequest(string Title);
record UpdateTodoRequest(string? Title, bool? IsCompleted);
```

## Development Notes

### Local Development
```bash
cd backend
dotnet restore
dotnet run
```
デフォルトでは http://localhost:5120 で起動します。

### HTTPS Redirection
開発環境では、HTTPSリダイレクトを無効化しています:
```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
```

### CORS Configuration
フロントエンド (localhost:5173, 127.0.0.1:5173) からのリクエストを許可:
```csharp
app.UseCors();
```

## Future Enhancements

### Planned Features
- **Controllers**: Minimal APIからController-basedアプローチへの移行（オプション）
- **Middleware**: カスタムミドルウェアの追加 (認証、ロギング等)
- **Validation**: FluentValidationの導入
- **Error Handling**: グローバルエラーハンドリングミドルウェア
- **OpenAPI/Swagger**: Swashbuckleによる詳細なAPI仕様生成
- **Health Checks**: ASP.NET Core Health Checksの導入

### Architectural Evolution
現在のMinimal APIスタイルから、より構造化されたアーキテクチャへの進化:
- Presentation Layer: Controllers
- Application Layer: Services (MediatR CQRS)
- Domain Layer: Models, Interfaces
- Infrastructure Layer: Repositories, External API clients

## Troubleshooting

### Port Conflicts
デフォルトポート (5120) が使用中の場合、`Properties/launchSettings.json` で変更可能です。

### CORS Errors
フロントエンドから接続できない場合:
1. CORS設定でフロントエンドのURLが許可されているか確認
2. `app.UseCors()` が正しく呼び出されているか確認
3. ブラウザのコンソールでエラーメッセージを確認

## References
- [ASP.NET Core Minimal APIs Overview](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis)
- [ASP.NET Core Dependency Injection](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection)
- [CORS in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/security/cors)
