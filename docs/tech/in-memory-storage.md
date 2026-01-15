# In-Memory Storage (Current Implementation)

## Purpose
現在、データベースの代わりにインメモリストレージを使用して、Todo データを一時的に保存しています。プロトタイプ開発と初期実装の迅速化を目的としています。

## Role in this Project
- Todo データの一時的な保存
- データベース導入前の開発とテストの促進
- CRUD操作の基本実装とロジック検証

## Current Implementation

### Location
`backend/Services/TodoService.cs`

### Storage Mechanism
C# の `List<Todo>` を使用:
```csharp
public class TodoService
{
    private readonly List<Todo> _todos = new();
    private int _nextId = 1;

    // CRUD methods...
}
```

### Service Registration
シングルトンとして登録されているため、アプリケーション実行中はデータが保持されます:
```csharp
// Program.cs
builder.Services.AddSingleton<TodoService>();
```

### CRUD Operations

#### Create
```csharp
public Todo Create(string title)
{
    var todo = new Todo
    {
        Id = _nextId++,
        Title = title,
        IsCompleted = false,
        CreatedAt = DateTime.UtcNow
    };
    _todos.Add(todo);
    return todo;
}
```

#### Read
```csharp
public List<Todo> GetAll() => _todos;

public Todo? GetById(int id) => _todos.FirstOrDefault(t => t.Id == id);
```

#### Update
```csharp
public Todo? Update(int id, string? title, bool? isCompleted)
{
    var todo = GetById(id);
    if (todo == null) return null;

    if (title != null) todo.Title = title;
    if (isCompleted.HasValue) todo.IsCompleted = isCompleted.Value;

    return todo;
}
```

#### Delete
```csharp
public bool Delete(int id)
{
    var todo = GetById(id);
    if (todo == null) return false;

    _todos.Remove(todo);
    return true;
}
```

## Characteristics

### Advantages
- **セットアップ不要**: データベースのインストールや設定が不要
- **高速**: メモリ上での操作のため、非常に高速
- **シンプル**: 追加のライブラリや設定が不要
- **開発効率**: 初期開発とプロトタイピングが迅速

### Limitations
- **データ永続化なし**: アプリケーション再起動でデータが消失
- **スケーラビリティ**: 大量のデータには対応できない
- **マルチインスタンス非対応**: 複数のアプリケーションインスタンス間でデータを共有できない
- **トランザクション未対応**: 複雑なデータ操作やロールバックができない
- **同時実行制御なし**: スレッドセーフではない（現在のシングルトン実装では問題になる可能性）

## Migration Path to PostgreSQL

### Planned Architecture
インメモリストレージからPostgreSQLへの移行:

```
Current:
TodoService → List<Todo> (In-Memory)

Future:
TodoController → TodoService → ITodoRepository → TodoRepository → PostgreSQL (via Dapper)
```

### Migration Steps
1. **ITodoRepository インターフェース定義**
   - CRUD操作のインターフェースを定義
   - `GetAll()`, `GetById()`, `Create()`, `Update()`, `Delete()`

2. **InMemoryTodoRepository 作成**
   - 現在の `TodoService` のロジックを移行
   - テストやローカル開発で使用可能

3. **PostgreSqlTodoRepository 作成**
   - Dapperを使用してPostgreSQLに接続
   - SQLクエリでCRUD操作を実装

4. **依存性注入の切り替え**
   ```csharp
   // 開発環境
   builder.Services.AddSingleton<ITodoRepository, InMemoryTodoRepository>();

   // 本番環境
   builder.Services.AddScoped<ITodoRepository, PostgreSqlTodoRepository>();
   ```

5. **TodoService のリファクタリング**
   - リポジトリパターンを使用するように変更
   - ビジネスロジックのみを保持

### Example Repository Interface
```csharp
public interface ITodoRepository
{
    Task<List<Todo>> GetAllAsync();
    Task<Todo?> GetByIdAsync(int id);
    Task<Todo> CreateAsync(string title);
    Task<Todo?> UpdateAsync(int id, string? title, bool? isCompleted);
    Task<bool> DeleteAsync(int id);
}
```

## Testing

### Current State
インメモリストレージのため、テストは容易:
- モックやスタブが不要
- 各テストで新しい `TodoService` インスタンスを作成
- テストデータの準備が簡単

### Future Testing Strategy
リポジトリパターン導入後:
- `InMemoryTodoRepository` をテスト用に使用
- ユニットテストでは実際のDBに接続しない
- 統合テストでは `PostgreSqlTodoRepository` を使用

## Development Notes

### Current Usage
```csharp
// DI経由で取得
app.MapGet("/api/todos", (TodoService todoService) =>
{
    return todoService.GetAll();
});
```

### Data Persistence
現在、データはアプリケーション起動時に空で、再起動すると全て消失します。
開発中にデータを保持したい場合は、以下のオプションがあります:
- アプリケーションを再起動しない
- 初期データをシードする（`TodoService` のコンストラクタで）
- 早期にPostgreSQLに移行する

## Troubleshooting

### Data Lost After Restart
これは仕様です。データベース導入まではこの動作が続きます。

### Thread Safety Issues
現在の実装はスレッドセーフではありません。高負荷時に問題が発生する可能性があります。
対処法:
- `lock` ステートメントを使用
- `ConcurrentDictionary` を使用
- 早期にPostgreSQLに移行

## References
- [Repository Pattern](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)
- [Dependency Injection in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection)
- [Dapper - Simple Object Mapper for .NET](https://github.com/DapperLib/Dapper)
