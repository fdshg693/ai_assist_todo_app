# React + Vite + TypeScript

## Purpose
React、Vite、TypeScriptを組み合わせて、モダンなフロントエンドアプリケーションを構築しています。高速な開発体験とタイプセーフなコードを実現します。

## Role in this Project
- ユーザーインターフェースの提供
- Todo管理画面の実装
- バックエンドAPIとの通信
- 状態管理とUIの更新

## Current Usage

### Project Configuration
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Vite**: 7.2.4
- **Node.js**: 24.5.0以上
- **パッケージマネージャー**: pnpm 10.27.0

### Project Structure
```
frontend/
├── src/
│   ├── components/       # Reactコンポーネント
│   │   └── TodoList.tsx  # Todo一覧とCRUD操作
│   ├── types/           # TypeScript型定義
│   │   └── todo.ts      # Todo関連の型
│   ├── App.tsx          # ルートコンポーネント
│   ├── App.css          # スタイル
│   └── main.tsx         # エントリーポイント
├── package.json
└── vite.config.ts
```

### Key Components

#### App.tsx
ルートコンポーネント。シンプルなレイアウトを提供:
```tsx
function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <TodoList />
    </div>
  )
}
```

#### TodoList.tsx
Todo管理のメインコンポーネント。以下の機能を提供:
- Todo一覧表示
- Todo追加フォーム
- Todo完了/未完了の切り替え
- Todo削除
- ローディング状態表示
- エラーハンドリング

#### Type Definitions (todo.ts)
TypeScriptインターフェースでデータ構造を定義:
```typescript
export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}
```

### State Management
現在は `React.useState` を使用したローカルステート管理:
```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [newTodoTitle, setNewTodoTitle] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string>('');
```

### API Communication
Fetch APIを使用してバックエンドと通信:
```tsx
const API_URL = 'http://localhost:5120/api/todos';

// GET
const response = await fetch(API_URL);
const data = await response.json();

// POST
const response = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: newTodoTitle }),
});

// PUT, DELETE も同様
```

## Development Notes

### Local Development
```bash
cd frontend
pnpm install
pnpm run dev
```
開発サーバーは http://localhost:5173 で起動します。

### Hot Module Replacement (HMR)
Viteにより、コード変更時に自動的にブラウザが更新されます。

### TypeScript Type Checking
```bash
pnpm run build  # ビルド時に型チェックを実行
```

### Linting
```bash
pnpm run lint  # ESLintによるコードチェック
```

## Build & Deployment

### Production Build
```bash
pnpm run build
```
`dist/` ディレクトリに静的ファイルが生成されます。

### Preview Production Build
```bash
pnpm run preview
```

## Current Limitations

### Styling
- 現在はインラインスタイルのみ使用
- UIライブラリ未導入
- レスポンシブデザイン未対応

### State Management
- ローカルステートのみ
- グローバル状態管理ライブラリ未使用

### Error Handling
- 基本的なtry-catchのみ
- エラーバウンダリ未実装
- リトライロジック未実装

## Future Enhancements

### Planned Libraries
- **Chakra UI**: UIコンポーネントライブラリ
- **Zustand**: 軽量な状態管理ライブラリ
- **React Router**: ページルーティング（必要に応じて）
- **React Query / TanStack Query**: サーバーステート管理

### Code Organization
- カスタムフックの抽出 (useApi, useTodos等)
- APIクライアントの抽出
- コンポーネントの細分化

### Testing
- React Testing Library
- Vitest (Viteのテストランナー)

## Troubleshooting

### Port Already in Use
デフォルトポート (5173) が使用中の場合、Viteは自動的に別のポートを使用します。

### CORS Errors
バックエンドAPIにアクセスできない場合:
1. バックエンドが起動しているか確認
2. バックエンドのCORS設定を確認
3. ブラウザの開発者ツールでネットワークエラーを確認

### TypeScript Errors
型エラーが発生する場合:
1. `node_modules/@types/` を確認
2. `pnpm install` を再実行
3. VSCodeの場合、TypeScriptサーバーを再起動

## References
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [pnpm Documentation](https://pnpm.io/)
