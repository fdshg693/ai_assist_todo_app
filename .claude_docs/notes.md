## Development Philosophy

This project prioritizes **learning and experimentation** over production-readiness:

- Try new libraries and frameworks freely
- Create feature branches for experiments
- Incomplete implementations are acceptable if they demonstrate learning
- The prototype is meant to be built upon incrementally

## Important Notes

- Backend port is 5120, NOT 5000 (common mistake)
- Use pnpm, not npm or yarn, for frontend dependencies
- WSL2 recommended for Windows development
- All documentation is in Japanese
- Data persistence not yet implemented - backend restart clears all todos
- The .NET SDK version is specifically 10.0.101
- **Chakra UI v3**: Uses new API patterns (e.g., `Checkbox.Root`, `gap` instead of `spacing`)
- **Icons**: Use Lucide React instead of @chakra-ui/icons (v2 icons incompatible with v3)
