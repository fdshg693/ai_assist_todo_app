# 開発計画

## 📋 開発方針

### 開発フロー

このプロジェクトでは、以下の開発フローを採用します：

1. **設計フェーズ**
   - 機能要件の明確化
   - アーキテクチャ設計
   - API設計

2. **実装フェーズ**
   - Claude Codeを活用した開発
   - AIアシストによるコード生成とレビュー

3. **テスト・デプロイフェーズ**
   - 単体テスト・統合テスト
   - コンテナ化とデプロイ

### ドキュメント方針

- **AIフレンドリーなドキュメント**
  - AI（Claude等）が理解しやすい構造化されたドキュメント
  - 機械可読性を優先した記述
  - 必要十分な技術的詳細の記載

- **コンテキスト管理**
  - ドキュメントの肥大化を防ぐための階層化
  - 責務ごとの明確なファイル分割
  - 必要に応じた情報の分離

## 🔧 バージョン管理

### Gitリポジトリ

- **ホスティング**: GitHub
- **リポジトリ**: 毎熊のアカウント配下

### ブランチ戦略

**GitHub Flow** を採用：

```
master (main)
  ├── feature/task-crud
  ├── feature/ai-recommendation
  ├── feature/ai-summary
  └── feature/user-authentication
```

#### ブランチルール

1. **masterブランチ**
   - 常にデプロイ可能な状態を維持
   - 直接のコミットは禁止

2. **featureブランチ**
   - `feature/機能名` の命名規則
   - masterから派生
   - Pull Requestを通じてmasterにマージ

3. **作業フロー**
   ```bash
   # 1. masterから最新を取得
   git checkout master
   git pull origin master
   
   # 2. featureブランチを作成
   git checkout -b feature/new-feature
   
   # 3. 開発・コミット
   git add .
   git commit -m "feat: 新機能の実装"
   
   # 4. Push & Pull Request作成
   git push origin feature/new-feature
   ```

## 📝 コミットメッセージ規約

Conventional Commitsに準拠：

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメント更新
- `refactor:` リファクタリング
- `test:` テスト追加・修正
- `chore:` ビルド・設定変更

## 🎯 開発マイルストーン

### Phase 1: 基礎実装
- [ ] 開発環境のセットアップ
- [ ] データベース設計
- [ ] 基本的なTodo CRUD機能

### Phase 2: AI機能統合
- [ ] Azure OpenAI連携
- [ ] AIレコメンド機能
- [ ] AIサマリ機能

### Phase 3: 拡張機能
- [ ] タスク分解機能
- [ ] 学習リソース生成
- [ ] パフォーマンス最適化