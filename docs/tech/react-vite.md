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
│   ├── components/          # Reactコンポーネント
│   │   ├── Dashboard.tsx    # ダッシュボードレイアウト
│   │   ├── EmptyState.tsx   # Todo未登録時の表示
│   │   ├── Layout.tsx       # アプリケーション全体のレイアウト
│   │   ├── TodoInput.tsx    # Todo追加フォーム
│   │   ├── TodoItem.tsx     # 個別のTodoアイテム
│   │   └── TodoList.tsx     # Todo一覧コンテナ
│   ├── store/              # 状態管理
│   │   └── todoStore.ts    # Zustand store (グローバル状態)
│   ├── types/              # TypeScript型定義
│   │   └── todo.ts         # Todo関連の型
│   ├── App.tsx             # ルートコンポーネント
│   ├── main.tsx            # エントリーポイント (ChakraProvider)
│   └── theme.ts            # Chakra UI テーマ設定
├── package.json
└── vite.config.ts
```

### Key Components

#### App.tsx
ルートコンポーネント。LayoutとDashboardを組み合わせたシンプルな構成:
```tsx
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'

function App() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}
```

#### Layout.tsx
アプリケーション全体のレイアウトを提供。ヘッダーとコンテンツエリアを含む:
- ヘッダーにアプリタイトルを表示
- 子コンポーネントをコンテナで囲む
- Chakra UIのBox、Container、Headingを使用

#### Dashboard.tsx
メインのダッシュボードレイアウト。Chakra UIのGridシステムを使用:
- グリッドレイアウトでTodoListを配置
- 将来的にAI機能エリアを追加予定

#### TodoList.tsx
Todo一覧のコンテナコンポーネント:
- Zustand storeから状態を取得
- ローディング・エラー状態の表示
- TodoItem、TodoInput、EmptyStateを組み合わせ
- Framer MotionのAnimatePresenceで要素のアニメーション管理

#### TodoItem.tsx
個別のTodoアイテムコンポーネント:
- Chakra UIのCheckbox、IconButtonを使用
- Framer Motionで滑らかな表示/非表示アニメーション
- Lucide Reactアイコン (Trash2) を使用
- Zustand storeのアクションで状態更新

#### TodoInput.tsx
Todo追加フォームコンポーネント:
- Chakra UIのInput、Buttonを使用
- Lucide Reactアイコン (Plus) を使用
- Zustand storeのcreateActionで新規Todo作成

#### EmptyState.tsx
Todo未登録時の表示コンポーネント:
- Chakra UIのCenter、Stack、Textを使用
- Lucide Reactアイコン (CheckCircle) で視覚的なフィードバック

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
Zustandを使用したグローバル状態管理:
```tsx
// todoStore.ts - Zustandストア定義
interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string
  // 同期アクション
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  updateTodo: (id: number, updates: Partial<Todo>) => void
  deleteTodo: (id: number) => void
  // 非同期アクション
  fetchTodos: () => Promise<void>
  createTodo: (title: string) => Promise<void>
  toggleTodo: (id: number, isCompleted: boolean) => Promise<void>
  removeTodo: (id: number) => Promise<void>
}

export const useTodoStore = create<TodoState>((set) => ({ ... }))
```

コンポーネントでの使用:
```tsx
import { useTodoStore } from '../store/todoStore'

function TodoList() {
  const { todos, loading, error, fetchTodos } = useTodoStore()
  // ...
}
```

### UI Library
Chakra UI v3を使用したコンポーネントベースのUI構築:
- **ChakraProvider**: アプリケーション全体をラップ (main.tsx)
- **カスタムテーマ**: Noto Sans JPフォントを使用 (theme.ts)
- **主要コンポーネント**: Box, Container, Flex, Heading, Grid, GridItem, Stack, Input, Button, Checkbox, IconButton, Text, Spinner, Center
- **v3の新API**: `Checkbox.Root`、`Checkbox.Control`、`gap`プロップなど

Chakra UI Icons v2はv3と互換性がないため、Lucide Reactを使用:
```tsx
import { Plus, Trash2, CheckCircle } from 'lucide-react'
```

### Animations
Framer Motionを使用したアニメーション:
```tsx
import { motion, AnimatePresence } from 'framer-motion'

// Chakra UIコンポーネントとの統合
const MotionBox = motion.create(Box)

<AnimatePresence>
  {todos.map((todo) => (
    <MotionBox
      key={todo.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
    >
      <TodoItem todo={todo} />
    </MotionBox>
  ))}
</AnimatePresence>
```

### API Communication
Zustand storeでFetch APIを使用してバックエンドと通信:
```tsx
const API_URL = 'http://localhost:5120/api/todos';

// fetchTodosアクション内
const response = await fetch(API_URL);
const data = await response.json();
set({ todos: data, loading: false });

// createTodoアクション内
const response = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title }),
});

// PUT, DELETE も同様にZustand storeアクション内で実装
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

### Error Handling
- 基本的なtry-catchのみ
- エラーバウンダリ未実装
- リトライロジック未実装

### Testing
- テストコード未実装
- E2Eテスト未実装

### Routing
- シングルページのみ
- React Router未導入

## Recently Implemented

### UI & Styling
- ✅ Chakra UI v3導入（モダンなUIコンポーネント）
- ✅ カスタムテーマ設定（Noto Sans JPフォント）
- ✅ レスポンシブデザイン対応
- ✅ Framer Motionによるアニメーション
- ✅ Lucide Reactアイコンライブラリ

### State Management
- ✅ Zustandによるグローバル状態管理
- ✅ 非同期アクション実装
- ✅ エラーハンドリング統合

### Component Architecture
- ✅ コンポーネントの細分化（6つの独立したコンポーネント）
- ✅ プレゼンテーションとロジックの分離
- ✅ 再利用可能なコンポーネント設計

## Future Enhancements

### Planned Libraries
- **React Router**: ページルーティング（必要に応じて）
- **React Query / TanStack Query**: サーバーステート管理の最適化

### Code Organization
- カスタムフックの抽出 (useApi等)
- APIクライアントの抽出
- エラーバウンダリの実装

### Testing
- React Testing Library導入
- Vitest (Viteのテストランナー)
- E2Eテスト (Playwright等)

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
