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
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string; // ISO date string
}
```
