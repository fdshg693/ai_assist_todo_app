export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  isCompleted?: boolean;
}
