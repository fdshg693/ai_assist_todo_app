# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-assisted Todo management application with a learning-first approach. The project serves as an experimental platform to try various libraries and frameworks while building a functional Todo app with AI features.

**Technology Stack:**
- Frontend: Vite + React 19 + TypeScript 5.9
- UI Library: Chakra UI v3
- State Management: Zustand
- Icons: Lucide React
- Animations: Framer Motion
- Backend: .NET 10.0 ASP.NET Core Web API
- Package Manager: pnpm 10.27.0 (managed via corepack)
- Node: 24.5.0

## Development Commands

### Frontend (React)
```bash
cd frontend
pnpm install          # Install dependencies
pnpm run dev          # Start dev server (http://localhost:5173)
pnpm run build        # Build for production (runs tsc -b && vite build)
pnpm run lint         # Run ESLint
pnpm run preview      # Preview production build
```

### Backend (.NET)
```bash
cd backend
dotnet restore        # Restore dependencies
dotnet run            # Start dev server (http://localhost:5120)
dotnet build          # Build the project
```

**Note:** Backend runs on port 5120, not 5000. CORS is configured to allow requests from localhost:5173 and 127.0.0.1:5173.

## Architecture

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

## Key Implementation Details

### Backend Architecture
- Uses .NET 10 minimal APIs (no controllers)
- TodoService is registered as a singleton via dependency injection
- DTOs (CreateTodoRequest, UpdateTodoRequest) are defined as records in Program.cs
- HTTPS redirect disabled in development mode
- All dates use UTC (Todo.CreatedAt)

### Frontend Architecture
- Uses React 19 with hooks (useState, useEffect)
- **State Management**: Zustand store (`todoStore.ts`) manages global todo state
  - All CRUD operations performed through store actions
  - Centralized loading and error states
- **UI Components**: Built with Chakra UI v3
  - Component-based architecture with separation of concerns
  - Responsive design using Chakra's responsive props
  - Styled using Chakra's prop-based styling system
  - Custom theme with Noto Sans JP font
- **Icons**: Lucide React (Chakra UI Icons v2 is not compatible with v3)
- **Animations**: Framer Motion for smooth transitions on todo items
- Error handling centralized in Zustand store with UI feedback

### Type Definitions
Frontend Todo type should match backend Todo model:
```typescript
{
  id: number
  title: string
  isCompleted: boolean
  createdAt: string // ISO date string
}
```

## Development Philosophy

This project prioritizes **learning and experimentation** over production-readiness:
- Try new libraries and frameworks freely
- Create feature branches for experiments
- Incomplete implementations are acceptable if they demonstrate learning
- The prototype is meant to be built upon incrementally

## Planned Features

### Current Phase (Implemented)
- Basic CRUD operations for todos
- Frontend-backend communication
- Modern UI with Chakra UI v3
- Global state management with Zustand
- Responsive design and animations
- Loading states and error handling

### Next Phase (Planned)
- AI Recommendation: Suggest next todo to work on
- AI Summary: Summarize current task status
- Task prioritization support

### Future Phases
- AI task decomposition (break large todos into subtasks)
- Learning resource generation for todos
- Database persistence (currently in-memory only)

## Documentation Structure

Comprehensive documentation exists in `docs/`:
- `docs/QUICKSTART.md` - Environment setup and first-time setup guide
- `docs/plan/PLAN.md` - Detailed project plan (325 lines)
- `docs/plan/CHART.md` - Architecture diagrams and charts (371 lines)
- `docs/app/CURRENT.md` - Current implementation status tracker
- `docs/tech/` - Technical documentation for tools and libraries

## Important Notes

- Backend port is 5120, NOT 5000 (common mistake)
- Use pnpm, not npm or yarn, for frontend dependencies
- WSL2 recommended for Windows development
- All documentation is in Japanese
- Data persistence not yet implemented - backend restart clears all todos
- The .NET SDK version is specifically 10.0.101
- **Chakra UI v3**: Uses new API patterns (e.g., `Checkbox.Root`, `gap` instead of `spacing`)
- **Icons**: Use Lucide React instead of @chakra-ui/icons (v2 icons incompatible with v3)
