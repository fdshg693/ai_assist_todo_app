# 現在のアプリの状況

## RULE
- `app/CURRENT.md` は、アプリの現在の状態を記録するためのドキュメントです。
- ここには、現在実装されている機能や進捗状況を簡潔にまとめます。
- 図や複雑な依存関係の説明は避け、箇条書き形式で記述します。

## 実装状況

### 完了済み機能

#### バックエンド (ASP.NET Core)
- **基本構成**
  - .NET 10.0 Web API プロジェクト
  - CORS設定 (フロントエンド localhost:5173, 127.0.0.1:5173 を許可)
  - 開発環境でのHTTPSリダイレクト無効化
  - ポート: 5120 (デフォルト設定)

- **データモデル**
  - `Todo` モデル (backend/Models/Todo.cs)
    - `Id` (int): Todo識別子
    - `Title` (string): Todoタイトル
    - `IsCompleted` (bool): 完了状態
    - `CreatedAt` (DateTime): 作成日時

- **サービスレイヤー**
  - `TodoService` (backend/Services/TodoService.cs)
    - インメモリストレージ (List<Todo>)
    - シングルトンとしてDI登録
    - CRUD操作の実装

- **API エンドポイント**
  - `GET /api/hello` - ヘルスチェック用エンドポイント
  - `GET /api/todos` - 全Todo取得
  - `GET /api/todos/{id}` - ID指定でTodo取得
  - `POST /api/todos` - 新規Todo作成
  - `PUT /api/todos/{id}` - Todo更新 (タイトル/完了状態)
  - `DELETE /api/todos/{id}` - Todo削除

- **リクエスト/レスポンス型**
  - `CreateTodoRequest` record (Title)
  - `UpdateTodoRequest` record (Title?, IsCompleted?)

#### フロントエンド (React + TypeScript)
- **基本構成**
  - React 19.2.0
  - TypeScript 5.9.3
  - Vite 7.2.4 (開発サーバー/ビルドツール)
  - ポート: 5173 (デフォルト設定)

- **型定義**
  - `Todo` interface (frontend/src/types/todo.ts)
    - `id`, `title`, `isCompleted`, `createdAt`
  - `CreateTodoRequest` interface
  - `UpdateTodoRequest` interface

- **コンポーネント**
  - `App.tsx` - アプリケーションのルートコンポーネント
    - シンプルなレイアウト (グレー背景、パディング)
    - TodoListコンポーネントをマウント

  - `TodoList.tsx` (frontend/src/components/TodoList.tsx)
    - Todo一覧表示
    - Todo追加フォーム
    - Todoのチェックボックス (完了/未完了切り替え)
    - Todo削除ボタン
    - ローディング状態表示
    - エラーハンドリングとエラーメッセージ表示

- **API通信**
  - fetch APIを使用したREST API呼び出し
  - バックエンドURL: `http://localhost:5120/api/todos`
  - GET (全取得), POST (作成), PUT (更新), DELETE (削除) の実装

- **UI機能**
  - インラインスタイルによる基本的なスタイリング
  - 完了したTodoに取り消し線を表示
  - Todoが0件の場合のプレースホルダー表示
  - リアルタイムなUI更新

### 現在の技術スタック

#### フロントエンド
- **ランタイム**: Node.js 24+
- **パッケージマネージャー**: pnpm 10.27.0
- **フレームワーク**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **開発ツール**: ESLint 9.39.1
- **状態管理**: React useState (ローカルステート)
- **UIライブラリ**: なし (インラインスタイルのみ)

#### バックエンド
- **ランタイム**: .NET 10.0.101
- **フレームワーク**: ASP.NET Core Web API
- **言語**: C#
- **依存パッケージ**:
  - Microsoft.AspNetCore.OpenApi 10.0.1
- **データストレージ**: インメモリ (List<Todo>)
- **ORM**: 未使用 (将来的にDapper導入予定)

### 未実装機能

#### プラン済みだが未実装
- データベース連携 (PostgreSQL)
- Dapperによるデータアクセス
- AI機能 (Microsoft Agent Framework)
  - AIレコメンド (次に取り組むべきタスク提案)
  - AIサマリ (タスク状況の要約)
  - タスク分解
- Azure OpenAI Service連携
- 認証・認可機能
- ユーザー管理
- UIライブラリ (Chakra UI等)
- 状態管理ライブラリ (Zustand等)
- ロギング (Serilog)
- バリデーション (FluentValidation)
- CQRS (MediatR)
- レジリエンス (Polly)
- Docker/docker-compose設定
- マイクロサービス化 (gRPC/MagicOnion)

### アーキテクチャの現状

#### 現在の構成
- **フロントエンド**: シンプルなReactアプリケーション
  - 単一コンポーネント構成 (App → TodoList)
  - ローカルステート管理
  - 直接fetch APIでバックエンドと通信

- **バックエンド**: 最小構成のWeb API
  - Minimal API スタイル (Program.cs内でルーティング定義)
  - インメモリデータストレージ
  - シンプルなサービスレイヤー
  - レイヤードアーキテクチャの基礎 (Models, Services分離)

#### 将来のアーキテクチャ (計画)
- フロントエンド: 状態管理ライブラリ、UIライブラリ導入
- バックエンド: 完全なレイヤードアーキテクチャ
  - Presentation Layer (Controllers)
  - Application Layer (Services)
  - Domain Layer (Models, Interfaces)
  - Infrastructure Layer (Database, External APIs)
- データベース: PostgreSQL (Dockerコンテナ)
- AI統合: Microsoft Agent Framework + Azure OpenAI

### 開発環境

#### 起動方法
**フロントエンド**
```bash
cd frontend
pnpm install
pnpm run dev
# http://localhost:5173 でアクセス可能
```

**バックエンド**
```bash
cd backend
dotnet restore
dotnet run
# http://localhost:5120 でアクセス可能
```

#### 動作確認済み環境
- OS: WSL2 (Windows Subsystem for Linux)
- Node.js: 24.5.0
- pnpm: 10.27.0
- .NET SDK: 10.0.101

### 既知の制限事項

- データはインメモリに保存されており、アプリケーション再起動で消失
- 認証機能がないため、誰でもアクセス可能
- エラーハンドリングは基本的なもののみ
- UIは最小限の機能とスタイリング
- バックエンドのポートがドキュメント (5000) と実装 (5120) で異なる
- データベース未接続
- AI機能未実装

### 次のステップ候補

1. PostgreSQL データベースの導入とDocker設定
2. Dapperによるデータアクセスレイヤーの実装
3. データベースマイグレーション設定
4. UIライブラリ (Chakra UI) の導入
5. 状態管理ライブラリ (Zustand) の導入
6. Azure OpenAI Serviceの統合準備
7. Microsoft Agent Frameworkの調査と導入
8. 認証・認可機能の実装
9. ロギング、バリデーション、エラーハンドリングの強化
10. Docker Compose による開発環境の整備
