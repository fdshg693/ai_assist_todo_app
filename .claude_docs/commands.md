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
