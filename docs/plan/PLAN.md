# AI Assist Todo App 開発計画書

## 1. プロジェクト概要とシステムの目的

### 1.1 システムの目的

AI Assist Todo Appは、AIによる支援機能を持つTodoタスク管理アプリケーションです。ユーザーのタスク管理を効率化し、生産性を向上させることを目的としています。

### 1.2 主な機能

- **Todo CRUD操作**: タスクの作成・編集・削除・完了管理
- **AIレコメンド**: 次に取り組むべきタスクの提案
- **AIサマリ**: タスク状況の要約と進捗分析
- **優先順位管理**: タスクの重要度・緊急度の管理
- **将来実装予定**:
  - タスク分解（大規模タスクの細分化）
  - 学習リソース生成

### 1.3 システムコンテキスト

システムは以下の要素で構成されます：

```
エンドユーザー (アプリ利用者)
    ↓
AI Assist Todo App (本システム)
    ↓
Azure OpenAI Service (外部AIサービス)
```

**エンドユーザー**:
- Todoの作成・管理
- AI推奨タスクの確認
- タスクサマリの閲覧

**Azure OpenAI Service**:
- AIモデルの提供（gpt-5-nano、gpt-5、gpt-4o-mini等）
- Response APIを使用
- タスクの優先順位付けとレコメンド
- タスク状況のサマリ生成

詳細なアーキテクチャ図については[CHART.md](CHART.md)を参照してください。

---

## 2. 開発方針・プロセス

### 2.1 開発方針

#### ビジネスロジック重視
- **フォーカス**: ビジネスロジックとAI機能の実装
- **簡素化**: UI/UXは必要最小限
- **プロトタイプ優先**: 迅速な機能検証

#### スケーラビリティ
- モジュール単位での分離
- マイクロサービス化への移行可能性を確保
- API Gatewayパターンの導入可能な設計

### 2.2 ドキュメント方針

#### AIフレンドリーなドキュメント
- AI（Claude等）が理解しやすい構造化されたドキュメント
- 機械可読性を優先した記述
- 必要十分な技術的詳細の記載

#### コンテキスト管理
- ドキュメントの肥大化を防ぐための階層化
- 責務ごとの明確なファイル分割
- 必要に応じた情報の分離

### 2.3 バージョン管理 - GitHub Flow

#### リポジトリ
- **ホスティング**: GitHub
- **ブランチ戦略**: GitHub Flow

```
master (main)
  ├── feature/task-crud
  ├── feature/ai-recommendation
  ├── feature/ai-summary
  └── feature/user-authentication
```

---

## 3. 技術スタック詳細

### 3.1 アーキテクチャ概要

モダンなフルスタックWebアプリケーションとして設計されています。

```
Frontend (React + TypeScript)
    ↓ REST API (HTTPS/JSON)
Backend (.NET 10 Web API)
    ↓
PostgreSQL Database + Azure OpenAI Service
```

詳細なコンテナ構成図については[CHART.md](CHART.md)を参照してください。

### 3.2 フロントエンド

#### コア技術
- **React 18+**
  - モダンなUIライブラリ
  - Hooks APIを活用
- **TypeScript 5+**（最新安定版）
  - 型安全性の確保
  - 開発効率の向上

#### 状態管理
- **Zustand**: 軽量な状態管理ライブラリ
- React Context API（必要に応じて併用）

#### UIライブラリ
- **Chakra UI v2**: コンポーネントライブラリ

#### 主要コンポーネント
- Todo一覧・作成・編集UI
- AIレコメンド表示
- AIサマリ表示
- 状態管理

#### デプロイ
- 静的ホスティングまたはコンテナ
- ポート: 3000

### 3.3 バックエンド

#### コア技術
- **.NET 10**
  - ASP.NET Core Web API
  - C#

#### データアクセス
- **Dapper**: 軽量なマイクロORM
  - 高パフォーマンス
  - SQLの柔軟性

#### 主要ライブラリ
- **Serilog**: 構造化ログ
- **FluentValidation**: バリデーション
- **MediatR**: CQRS実装
- **Polly**: レジリエンス（リトライ、サーキットブレーカー）
- **Swashbuckle**: Swagger/OpenAPI生成

#### 主要機能
- Todo CRUD API
- AI統合サービス (Microsoft Agent Framework)
- 認証・認可（後回し）

#### デプロイ
- Dockerコンテナ
- ポート: 5000

### 3.4 データベース

#### PostgreSQL

**ローカル環境**:
- Dockerコンテナで実行
- docker-compose.ymlで管理
- ポート: 5432

**本番環境**:
- Azure Database for PostgreSQL または
- AWS RDS for PostgreSQL

**主要テーブル**:
- Todos（タスク情報）
- Users（ユーザー情報）
- その他マスタデータ

**マイグレーション**:
- Dapperではマイグレーション機能なし
- 別途ツール使用検討（dbup、FluentMigrator等）

### 3.5 AI統合

#### AIフレームワーク
- **Microsoft Agent Framework**
  - Repository: [microsoft/agent-framework](https://github.com/microsoft/agent-framework)
  - エージェントベースのAI実装

#### AIモデル - Azure OpenAI Service
- **デフォルトモデル**: `gpt-5-nano`
- **API**: Response API使用
- **プロトコル**: HTTPS

**モデル切り替え対応**:
- 設定ファイルでモデルを柔軟に変更可能
- 対応モデル: `gpt-5-nano`, `gpt-5`, `gpt-4o-mini`等
- ※呼び出し方が大きく異なるモデルは対象外

#### AI機能の責務
- **レコメンデーション**: 次のタスク提案
- **サマリ生成**: タスク状況の要約
- **タスク分解**: 大規模タスクの細分化（将来実装）
- **学習リソース生成**:（将来実装）

---

## 4. アーキテクチャパターンと設計方針

### 4.1 レイヤードアーキテクチャ

バックエンドは以下の4層構造を採用：

```
┌─────────────────────────────────┐
│  Presentation Layer             │  Controllers
├─────────────────────────────────┤
│  Application Layer              │  Services
├─────────────────────────────────┤
│  Domain Layer                   │  Models, Interfaces
├─────────────────────────────────┤
│  Infrastructure Layer           │  Database, External APIs
└─────────────────────────────────┘
```

**Presentation Layer (Controllers)**:
- APIエンドポイントの定義
- リクエスト/レスポンスの処理
- バリデーション

**Application Layer (Services)**:
- ビジネスロジックの実装
- ユースケースの調整
- トランザクション管理

**Domain Layer (Models, Interfaces)**:
- ドメインモデル
- ビジネスルール
- インターフェース定義

**Infrastructure Layer (Database, External APIs)**:
- データベースアクセス
- 外部API連携（Azure OpenAI）
- キャッシング、ロギング

### 4.2 モジュラー設計

- 将来的なマイクロサービス化を見据えた設計
- 機能ごとの独立したモジュール構成
- 疎結合な設計

#### マイクロサービスへの移行検討
- **gRPC**: サービス間通信
- **MagicOnion**: .NET向けgRPCフレームワーク
  - 比較的簡単に導入可能
  - 可能なら取り入れたい

### 4.3 API連携

- バックエンド・フロントエンドでAPI仕様を共有
- **OpenAPI/Swagger**: API仕様の定義と共有
  - YAMLからコード生成は一旦不要
  - Swaggerドキュメントで仕様確認

### 4.4 通信フロー例

#### Todo作成フロー
1. ユーザー → Frontend: Todo入力
2. Frontend → Backend: POST /api/todos
3. Backend → Database: INSERT Todo
4. Backend → Frontend: 201 Created
5. Frontend: UI更新

#### AIレコメンドフロー
1. ユーザー → Frontend: レコメンド要求
2. Frontend → Backend: GET /api/todos/recommend
3. Backend → Database: SELECT Todos
4. Backend → Azure OpenAI: AI推論リクエスト
5. Azure OpenAI → Backend: レコメンド結果
6. Backend → Frontend: レコメンドTodo
7. Frontend: レコメンド表示

詳細なフロー図については[CHART.md](CHART.md)を参照してください。

---

## 5. 開発ツールとライブラリ

### コンテナ化

#### Docker

**開発環境**:
- WSL2上でDockerを実行
- docker-composeで複数コンテナを管理

**コンテナ構成**:
```yaml
services:
  - frontend (React)
  - backend (.NET API)
  - database (PostgreSQL)
```

---

## 6. 認証・セキュリティ方針（一旦放置）

### 5.1 認証方式

#### シンプルな認証方式
- **ベーシック認証**
  - ユーザー名 + パスワード
  - JWTトークンベース

#### OAuth 2.0（オプション）
- Googleアカウント連携
- 必要最小限の実装

### 5.2 セキュリティ対策

- ASP.NET Core Identity（簡易版）
- パスワードハッシュ化（bcrypt）
- HTTPS強制

---
