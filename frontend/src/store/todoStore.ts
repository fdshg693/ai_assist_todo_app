import { create } from 'zustand'
import type { Todo } from '../types/todo'

interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string | null

  // Actions
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  updateTodo: (id: number, updates: Partial<Todo>) => void
  deleteTodo: (id: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Async actions
  fetchTodos: () => Promise<void>
  createTodo: (title: string) => Promise<void>
  toggleTodo: (id: number) => Promise<void>
  removeTodo: (id: number) => Promise<void>
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  updateTodo: (id, updates) => set((state) => ({
    todos: state.todos.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(t => t.id !== id)
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

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
      set({ error: error instanceof Error ? error.message : 'Failed to fetch todos', loading: false })
    }
  },

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
      get().addTodo(newTodo)
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create todo' })
      throw error
    }
  },

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
  },

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
}))
