# C4 Container Diagram

## コンテナ構成図

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                          エンドユーザー                               │
│                                                                     │
└───────────┬─────────────────────────────────────────────┬───────────┘
            │                                             │
            │ HTTPS                                       │
            │ (Webブラウザ)                                │
            │                                             │
┌───────────▼──────────────┐                 ┌────────────▼────────────┐
│                          │                 │                         │
│   Frontend Container     │                 │   Backend Container     │
│                          │                 │                         │
│  ┌────────────────────┐  │   REST API      │  ┌──────────────────┐   │
│  │  React App         │  │   (HTTPS/JSON)  │  │  ASP.NET Core    │   │
│  │  TypeScript        │◄─┼─────────────────┼─►│  Web API         │   │
│  │                    │  │                 │  │  C# + EF Core    │   │
│  │  - UI Components   │  │                 │  │                  │   │
│  │  - State Mgmt      │  │                 │  │  - Controllers   │   │
│  │  - API Client      │  │                 │  │  - Services      │   │
│  └────────────────────┘  │                 │  │  - Domain Logic  │   │
│                          │                 │  └──────────────────┘   │
│  Port: 3000              │                 │                         │
└──────────────────────────┘                 └────────┬────────────────┘
                                                      │
                                                      │ Port: 5000
                     ┌────────────────────────────────┼─────────────────┐
                     │                                │                 │
                     │ SQL/TCP                        │ HTTPS           │
                     │                                │                 │
          ┌──────────▼───────────┐         ┌──────────▼──────────┐      │
          │                      │         │                     │      │
          │  Database Container  │         │  Azure OpenAI       │      │
          │                      │         │  Service            │      │
          │  ┌────────────────┐  │         │                     │      │
          │  │  PostgreSQL    │  │         │  - gpt-5-nano      │      │
          │  │                │  │         │  - Response API    │      │
          │  │  - Todos Table │  │         │                     │      │
          │  │  - Users Table │  │         └─────────────────────┘      │
          │  └────────────────┘  │                                      │
          │                      │         (External Service)           │
          │  Port: 5432          │                                      │
          └──────────────────────┘                                      │
                                                                        │
          (Docker Container)                                            │
                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

## コンテナ詳細

### Frontend Container
- **技術**: React 18+, TypeScript 5+
- **責務**: ユーザーインターフェース
- **主要コンポーネント**:
  - Todo一覧・作成・編集UI
  - AIレコメンド表示
  - AIサマリ表示
  - 状態管理 (Context API / Redux Toolkit)
- **デプロイ**: 静的ホスティング or コンテナ
- **ポート**: 3000

### Backend Container
- **技術**: .NET Core 8+, ASP.NET Core Web API
- **責務**: ビジネスロジックとAPIエンドポイント
- **アーキテクチャ**:
  - Presentation Layer (Controllers)
  - Application Layer (Services)
  - Domain Layer (Models)
  - Infrastructure Layer (DB, External API)
- **主要機能**:
  - Todo CRUD API
  - AI統合サービス (Microsoft Agent Framework)
  - 認証・認可
- **デプロイ**: Dockerコンテナ
- **ポート**: 5000

### Database Container
- **技術**: PostgreSQL
- **責務**: データ永続化
- **主要テーブル**:
  - Todos (タスク情報)
  - Users (ユーザー情報)
  - その他マスタデータ
- **マイグレーション**: Entity Framework Core Migrations
- **ローカル環境**: Docker Compose
- **本番環境**: Azure Database for PostgreSQL / AWS RDS
- **ポート**: 5432

### Azure OpenAI Service (External)
- **技術**: Azure OpenAI
- **責務**: AI推論とテキスト生成
- **使用モデル**: 
  - デフォルト: gpt-5-nano
  - 切り替え可能: gpt-5, gpt-4o-mini等
- **プロトコル**: HTTPS (Response API)
- **用途**:
  - タスクレコメンド生成
  - タスクサマリ生成
  - 将来機能: タスク分解、学習リソース生成

## 通信フロー

### Todo作成フロー
1. ユーザー → Frontend: Todo入力
2. Frontend → Backend: POST /api/todos
3. Backend → Database: INSERT Todo
4. Backend → Frontend: 201 Created
5. Frontend: UI更新

### AIレコメンドフロー
1. ユーザー → Frontend: レコメンド要求
2. Frontend → Backend: GET /api/todos/recommend
3. Backend → Database: SELECT Todos
4. Backend → Azure OpenAI: AI推論リクエスト
5. Azure OpenAI → Backend: レコメンド結果
6. Backend → Frontend: レコメンドTodo
7. Frontend: レコメンド表示
