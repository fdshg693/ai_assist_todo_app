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
    - LayoutとDashboardを組み合わせた構成

  - `Layout.tsx` (frontend/src/components/Layout.tsx)
    - アプリケーション全体のレイアウト
    - ヘッダー (AI Todo App)
    - グレー背景、コンテナでラップ

  - `Dashboard.tsx` (frontend/src/components/Dashboard.tsx)
    - グリッドレイアウト (12カラム)
    - TodoListをメインエリアに配置
    - サイドバーエリア (将来のAI機能用)

  - `TodoList.tsx` (frontend/src/components/TodoList.tsx)
    - Todo一覧コンテナ
    - Zustandストアと統合
    - ローディング状態、エラー表示
    - TodoInputとTodoItemを組み合わせ

  - `TodoItem.tsx` (frontend/src/components/TodoItem.tsx)
    - 個別Todoアイテムの表示
    - Chakra UI Checkboxコンポーネント使用
    - 削除ボタン (Lucide React アイコン)
    - ホバーエフェクト、完了時のスタイル変更

  - `TodoInput.tsx` (frontend/src/components/TodoInput.tsx)
    - Todo追加フォーム
    - 入力欄とボタン
    - Enterキー対応、ローディング状態

  - `EmptyState.tsx` (frontend/src/components/EmptyState.tsx)
    - Todo 0件時の表示
    - アイコンとメッセージ

- **状態管理**
  - `todoStore.ts` (frontend/src/store/todoStore.ts)
    - Zustandによるグローバルステート管理
    - todos配列、loading、errorステート
    - 同期アクション (setTodos, addTodo, updateTodo, deleteTodo)
    - 非同期アクション (fetchTodos, createTodo, toggleTodo, removeTodo)

- **API通信**
  - Zustandストア内でfetch APIを使用
  - バックエンドURL: `http://localhost:5120/api/todos`
  - GET (全取得), POST (作成), PUT (更新), DELETE (削除) の実装
  - エラーハンドリングをストアで一元管理

- **UI機能**
  - Chakra UI v3によるモダンなスタイリング
  - レスポンシブデザイン (モバイル、タブレット、デスクトップ対応)
  - Framer Motionによるアニメーション (Todo追加/削除時)
  - 完了したTodoに取り消し線とグレーアウト
  - Todoが0件の場合のEmptyState表示
  - ローディングスピナー
  - エラーメッセージの視覚的表示
  - リアルタイムなUI更新

### 現在の技術スタック

#### フロントエンド
- **ランタイム**: Node.js 24+
- **パッケージマネージャー**: pnpm 10.27.0
- **フレームワーク**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **開発ツール**: ESLint 9.39.1
- **状態管理**: Zustand 5.0.10
- **UIライブラリ**: Chakra UI 3.31.0
- **アイコン**: Lucide React 0.562.0
- **アニメーション**: Framer Motion 12.26.2
- **スタイリング**: Emotion 11.14.0 (Chakra UI依存)

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
- ロギング (Serilog)
- バリデーション (FluentValidation)
- CQRS (MediatR)
- レジリエンス (Polly)
- Docker/docker-compose設定
- マイクロサービス化 (gRPC/MagicOnion)

### アーキテクチャの現状

#### 現在の構成
- **フロントエンド**: モダンなReactアプリケーション
  - コンポーネント分割構成 (App → Layout → Dashboard → TodoList → TodoItem/TodoInput)
  - Zustandによるグローバルステート管理
  - Chakra UI v3によるUIコンポーネント
  - Zustandストア経由でバックエンドと通信
  - アニメーション、レスポンシブデザイン対応

- **バックエンド**: 最小構成のWeb API
  - Minimal API スタイル (Program.cs内でルーティング定義)
  - インメモリデータストレージ
  - シンプルなサービスレイヤー
  - レイヤードアーキテクチャの基礎 (Models, Services分離)

#### 将来のアーキテクチャ (計画)
- フロントエンド: さらなる機能拡張
  - ダークモード対応
  - 多言語対応 (i18n)
  - Todo検索・フィルタリング
  - 詳細モーダル
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
- エラーハンドリングは基本的なもののみ (Zustandストアで一元管理)
- Chakra UI v3を使用 (v2のアイコンは非互換、Lucide Reactを使用)
- データベース未接続
- AI機能未実装

### 次のステップ候補

1. AI機能の実装 (Plan 2)
   - Azure OpenAI Service統合
   - AIレコメンド機能
   - AIサマリ機能
2. PostgreSQL データベースの導入とDocker設定
3. Dapperによるデータアクセスレイヤーの実装
4. データベースマイグレーション設定
5. 認証・認可機能の実装
6. ロギング、バリデーション、エラーハンドリングの強化
7. Docker Compose による開発環境の整備
8. UI拡張 (検索、フィルタ、ソート機能)
9. ダークモード対応
10. パフォーマンス最適化 (メモ化、コード分割)
