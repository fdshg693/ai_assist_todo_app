# Zustand

## Purpose
Zustandは軽量でシンプルなReact向けグローバル状態管理ライブラリです。ボイラープレートコードが少なく、直感的なAPIでアプリケーション全体の状態を管理できます。

## Role in this Project
- Todoの状態（リスト、ローディング、エラー）をグローバルに管理
- コンポーネント間でのデータ共有を簡素化
- API通信ロジックの一元管理
- 状態の不変性を保ちながら更新を実行

## Current Usage

### Installation
```bash
pnpm add zustand
```

### Store Definition (todoStore.ts)
プロジェクトのメインストアは `frontend/src/store/todoStore.ts` で定義されています。

#### State Interface
```typescript
interface TodoState {
  // State
  todos: Todo[]
  loading: boolean
  error: string | null

  // Sync Actions
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  updateTodo: (id: number, updates: Partial<Todo>) => void
  deleteTodo: (id: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Async Actions
  fetchTodos: () => Promise<void>
  createTodo: (title: string) => Promise<void>
  toggleTodo: (id: number) => Promise<void>
  removeTodo: (id: number) => Promise<void>
}
```

#### Store Implementation
```typescript
import { create } from 'zustand'

export const useTodoStore = create<TodoState>((set, get) => ({
  // Initial State
  todos: [],
  loading: false,
  error: null,

  // Sync Actions
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({
    todos: [...state.todos, todo]
  })),
  updateTodo: (id, updates) => set((state) => ({
    todos: state.todos.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(t => t.id !== id)
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Async Actions (see below for details)
  fetchTodos: async () => { /* ... */ },
  createTodo: async (title: string) => { /* ... */ },
  toggleTodo: async (id: number) => { /* ... */ },
  removeTodo: async (id: number) => { /* ... */ }
}))
```

### Component Usage

#### Basic Usage
コンポーネント内でストアを使用:
```tsx
import { useTodoStore } from '../store/todoStore'

function TodoList() {
  const { todos, loading, error, fetchTodos } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) return <Spinner />
  if (error) return <Text color="red.500">{error}</Text>

  return (
    <Stack>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Stack>
  )
}
```

#### Selective Subscription
必要な状態のみを購読してパフォーマンスを最適化:
```tsx
// 全体を取得（再レンダリングが多い）
const state = useTodoStore()

// 特定の値のみ取得（推奨）
const todos = useTodoStore(state => state.todos)
const loading = useTodoStore(state => state.loading)
```

### Async Actions with API Integration

#### fetchTodos - Todo一覧取得
```typescript
fetchTodos: async () => {
  set({ loading: true, error: null })
  try {
    const response = await fetch('http://localhost:5120/api/todos')
    if (!response.ok) {
      throw new Error('Failed to fetch todos')
    }
    const todos = await response.json()
    set({ todos, loading: false })
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Failed to fetch todos',
      loading: false
    })
  }
}
```

#### createTodo - Todo作成
```typescript
createTodo: async (title: string) => {
  try {
    const response = await fetch('http://localhost:5120/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    if (!response.ok) {
      throw new Error('Failed to create todo')
    }
    const newTodo = await response.json()
    get().addTodo(newTodo)  // 同期アクションを呼び出し
  } catch (error) {
    set({ error: error instanceof Error ? error.message : 'Failed to create todo' })
    throw error  // コンポーネント側でもエラーハンドリング可能
  }
}
```

#### toggleTodo - Todo完了状態切り替え
```typescript
toggleTodo: async (id: number) => {
  const todo = get().todos.find(t => t.id === id)
  if (!todo) return

  try {
    const response = await fetch(`http://localhost:5120/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: todo.title,
        isCompleted: !todo.isCompleted
      })
    })
    if (!response.ok) {
      throw new Error('Failed to update todo')
    }
    get().updateTodo(id, { isCompleted: !todo.isCompleted })
  } catch (error) {
    set({ error: error instanceof Error ? error.message : 'Failed to update todo' })
    throw error
  }
}
```

#### removeTodo - Todo削除
```typescript
removeTodo: async (id: number) => {
  try {
    const response = await fetch(`http://localhost:5120/api/todos/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete todo')
    }
    get().deleteTodo(id)
  } catch (error) {
    set({ error: error instanceof Error ? error.message : 'Failed to delete todo' })
    throw error
  }
}
```

## Key Concepts

### set() Function
状態を更新する関数。オブジェクトをマージまたは関数で現在の状態を取得:
```typescript
// 直接更新
set({ loading: true })

// 現在の状態から新しい状態を計算
set((state) => ({ todos: [...state.todos, newTodo] }))
```

### get() Function
ストア内で現在の状態を取得する関数。非同期アクション内で便利:
```typescript
const currentTodos = get().todos
const todo = get().todos.find(t => t.id === id)
```

### Immutability
Zustandは状態の不変性を要求します。配列や オブジェクトを更新する際は新しいコピーを作成:
```typescript
// 良い例
set((state) => ({ todos: [...state.todos, newTodo] }))

// 悪い例（元の配列を変更）
set((state) => {
  state.todos.push(newTodo)
  return { todos: state.todos }
})
```

## Development Notes

### State Organization
- ストアは単一責任の原則に従う（Todo関連の状態のみ）
- 複数のストアが必要な場合は、機能ごとに分割可能

### Error Handling
エラーは以下のパターンで処理:
1. 非同期アクション内でtry-catchを使用
2. エラー状態をストアに保存 (`error` state)
3. コンポーネント側でエラーを表示

### Performance Optimization
- セレクター関数を使用して必要な状態のみ購読
- 不要な再レンダリングを避ける
```typescript
// 推奨: 特定の値のみ購読
const todos = useTodoStore(state => state.todos)

// 非推奨: ストア全体を購読
const store = useTodoStore()
```

## Future Enhancements

### DevTools Integration
Zustand DevToolsでデバッグを強化:
```typescript
import { devtools } from 'zustand/middleware'

export const useTodoStore = create<TodoState>()(
  devtools(
    (set, get) => ({ /* ... */ }),
    { name: 'TodoStore' }
  )
)
```

### Persistence
ローカルストレージへの自動保存:
```typescript
import { persist } from 'zustand/middleware'

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({ /* ... */ }),
    { name: 'todo-storage' }
  )
)
```

### Middleware
カスタムミドルウェアでロギングやトラッキングを追加:
```typescript
const logMiddleware = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('Applying', args)
      set(...args)
    },
    get,
    api
  )
```

## Troubleshooting

### Re-render Issues
不要な再レンダリングが発生する場合:
- セレクター関数を使用して必要な状態のみ購読
- useMemoやuseCallbackを適切に使用

### Async Action Errors
非同期アクションが失敗する場合:
1. バックエンドAPIが起動しているか確認
2. ネットワークタブでリクエスト/レスポンスを確認
3. エラー状態がストアに正しく設定されているか確認

### Type Errors
TypeScriptの型エラーが発生する場合:
- インターフェース定義を確認
- `create<TodoState>`でジェネリック型を指定
- 型推論が正しく機能しているか確認

## References
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [React State Management Guide](https://react.dev/learn/managing-state)
