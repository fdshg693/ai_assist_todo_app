# 技術スタック

## 🏗️ アーキテクチャ概要

このプロジェクトは、モダンなフルスタックWebアプリケーションとして設計されています。

```
┌─────────────────────────────────────────┐
│          Frontend (React)               │
│         TypeScript + React              │
└─────────────────┬───────────────────────┘
                  │ REST API
┌─────────────────▼───────────────────────┐
│        Backend (.NET Core)              │
│    C# + ASP.NET Core Web API            │
└─────────────────┬───────────────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
┌─────▼─────┐         ┌──────▼──────┐
│ PostgreSQL│         │ Azure OpenAI│
│  Database │         │   Service   │
└───────────┘         └─────────────┘
```

## 💻 フロントエンド

### コア技術

- **React 18+**
  - モダンなUIライブラリ
  - Hooks APIを活用

- **TypeScript 5+**
  - 型安全性の確保
  - 開発効率の向上

### 状態管理

- React Context API または Redux Toolkit

### UIライブラリ（検討中）

- Material-UI または Ant Design

## 🔧 バックエンド

### コア技術

- **.NET Core 8+**
  - ASP.NET Core Web API
  - Entity Framework Core

### アーキテクチャパターン

- **レイヤードアーキテクチャ**
  ```
  ├── Presentation Layer (Controllers)
  ├── Application Layer (Services)
  ├── Domain Layer (Models, Interfaces)
  └── Infrastructure Layer (Database, External APIs)
  ```

- **モジュラー設計**
  - 将来的なマイクロサービス化を見据えた設計
  - 機能ごとの独立したモジュール構成

## 🗄️ データベース

### PostgreSQL

- **ローカル環境**
  - Dockerコンテナで実行
  - docker-compose.ymlで管理

- **本番環境**
  - Azure Database for PostgreSQL
  - または AWS RDS for PostgreSQL

### マイグレーション

- Entity Framework Core Migrations

## 🤖 AI統合

### AIフレームワーク

- **Microsoft Agent Framework**
  - Repository: [microsoft/agent-framework](https://github.com/microsoft/agent-framework)
  - エージェントベースのAI実装

### AIモデル

- **Azure OpenAI Service**
  - **デフォルトモデル**: `gpt-5-nano`
  - **API**: Response API使用
  
- **モデル切り替え対応**
  - 設定ファイルでモデルを柔軟に変更可能
  - 対応モデル: `gpt-5-nano`, `gpt-5`, `gpt-4o-mini` 等
  - ※ 呼び出し方が大きく異なるモデルは対象外

### AI機能の責務

- **レコメンデーション**: 次のタスク提案
- **サマリ生成**: タスク状況の要約
- **タスク分解**: 大規模タスクの細分化（将来実装）

## 🐳 コンテナ化

### Docker

- **開発環境**
  - WSL2上でDockerを実行
  - docker-composeで複数コンテナを管理

- **コンテナ構成**
  ```yaml
  services:
    - frontend (React)
    - backend (.NET API)
    - database (PostgreSQL)
  ```

### デプロイ

- Azure Container Instances または
- Azure Kubernetes Service (将来的な選択肢)

## 🔐 認証・認可

### シンプルな認証方式

- **ベーシック認証**
  - ユーザー名 + パスワード
  - JWTトークンベース

- **OAuth 2.0 (オプション)**
  - Google アカウント連携
  - 必要最小限の実装

### セキュリティ

- ASP.NET Core Identity (簡易版)
- パスワードハッシュ化 (bcrypt)
- HTTPS強制

## 📦 開発ツール

### パッケージマネージャー

- **Frontend**: npm または yarn
- **Backend**: NuGet

### コード品質

- **Linter**
  - ESLint (TypeScript)
  - .NET Analyzer

- **Formatter**
  - Prettier (Frontend)
  - .editorconfig (Backend)

## 🎯 開発方針

### ビジネスロジック重視

- **フォーカス**: ビジネスロジックとAI機能の実装
- **簡素化**: UI/UXは必要最小限
- **プロトタイプ優先**: 迅速な機能検証

### スケーラビリティ

- モジュール単位での分離
- マイクロサービス化への移行可能性を確保
- API Gatewayパターンの導入可能な設計