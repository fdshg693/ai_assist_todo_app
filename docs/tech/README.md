# Technology Documentation

このディレクトリには、AI Assist Todo Appで使用されている技術スタックとその実装詳細のドキュメントが含まれています。

## 現在実装されている技術

### Backend
- [ASP.NET Core Minimal API](./aspnet-minimal-api.md) - Web APIフレームワーク
- [In-Memory Storage](./in-memory-storage.md) - 一時的なデータストレージ（開発中）

### Frontend
- [React + Vite + TypeScript](./react-vite.md) - フロントエンドフレームワークとビルドツール

## 将来実装予定の技術

以下の技術は計画されていますが、まだドキュメント化されていません:

### Backend (Planned)
- PostgreSQL - リレーショナルデータベース
- Dapper - マイクロORM
- Microsoft Agent Framework - AIエージェント統合
- Azure OpenAI Service - AI推論サービス
- Serilog - 構造化ロギング
- FluentValidation - バリデーションライブラリ
- MediatR - CQRS実装
- Polly - レジリエンスとトランザクション処理

### Frontend (Planned)
- Chakra UI - UIコンポーネントライブラリ
- Zustand - 状態管理ライブラリ
- React Query / TanStack Query - サーバーステート管理

### Infrastructure (Planned)
- Docker & Docker Compose - コンテナ化
- gRPC / MagicOnion - マイクロサービス通信（将来的に）

## ドキュメントの読み方

各技術ドキュメントは以下の構成になっています:

1. **Purpose** - なぜこの技術を使用しているか
2. **Role in this Project** - このプロジェクトでの役割
3. **Current Usage** - 現在の使用方法と実装詳細
4. **Development Notes** - 開発時の注意点
5. **Future Enhancements** - 将来的な拡張予定
6. **Troubleshooting** - よくある問題と解決方法
7. **References** - 参考リンク

## ドキュメントの更新ルール

新しい技術を導入した場合、または既存の技術の使い方を大きく変更した場合は、このディレクトリに対応するドキュメントを作成または更新してください。

### ドキュメント作成のガイドライン
- ファイル名は小文字とハイフンを使用 (例: `aspnet-minimal-api.md`)
- プロジェクト固有の情報に焦点を当てる
- 汎用的な技術説明は最小限にし、参考リンクを提供
- コード例は実際のプロジェクトから抜粋
- 将来の移行計画や拡張予定も記載

## 関連ドキュメント

- [アプリケーションの現在の状態](../app/CURRENT.md) - 実装状況の全体像
- [開発計画書](../plan/PLAN.md) - プロジェクト全体の計画
- [アーキテクチャ図](../plan/CHART.md) - システム構成図
- [クイックスタートガイド](../QUICKSTART.md) - 開発環境構築手順
