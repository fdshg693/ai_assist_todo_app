### Frontend Structure

- `frontend/src/App.tsx` - Main application component, renders Layout and Dashboard
- `frontend/src/main.tsx` - Application entry point with ChakraProvider setup
- `frontend/src/theme.ts` - Chakra UI v3 theme configuration
- `frontend/src/components/` - React components:
  - `Layout.tsx` - Main layout wrapper with header
  - `Dashboard.tsx` - Dashboard grid layout
  - `TodoList.tsx` - Todo list container with Zustand integration
  - `TodoItem.tsx` - Individual todo item with checkbox and delete button
  - `TodoInput.tsx` - Input form for creating new todos
  - `EmptyState.tsx` - Empty state UI when no todos exist
- `frontend/src/store/` - Zustand state management:
  - `todoStore.ts` - Global todo state with async actions
- `frontend/src/types/` - TypeScript type definitions (todo.ts)
- API calls handled by Zustand store using native fetch, pointing to `http://localhost:5120/api`

### Backend Structure

- `backend/Program.cs` - Application entry point with minimal API endpoints
- `backend/Models/` - Data models (Todo.cs)
- `backend/Services/` - Business logic (TodoService.cs with in-memory storage)
- API endpoints follow RESTful conventions under `/api/*`

**Current API Endpoints:**

- `GET /api/hello` - Health check endpoint
- `GET /api/todos` - Get all todos
- `GET /api/todos/{id}` - Get todo by ID
- `POST /api/todos` - Create todo (body: `{ "title": "..." }`)
- `PUT /api/todos/{id}` - Update todo (body: `{ "title": "...", "isCompleted": true }`)
- `DELETE /api/todos/{id}` - Delete todo

### Data Flow

Frontend components → fetch API → Backend minimal APIs → TodoService (singleton, in-memory) → Todo model

**Important:** TodoService uses in-memory storage. Data is lost on backend restart.
