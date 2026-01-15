using Backend.Models;

namespace Backend.Services;

public class TodoService
{
    private readonly List<Todo> _todos = new();
    private int _nextId = 1;

    public List<Todo> GetAll()
    {
        return _todos;
    }

    public Todo? GetById(int id)
    {
        return _todos.FirstOrDefault(t => t.Id == id);
    }

    public Todo Create(string title)
    {
        var todo = new Todo
        {
            Id = _nextId++,
            Title = title,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };
        _todos.Add(todo);
        return todo;
    }

    public Todo? Update(int id, string? title, bool? isCompleted)
    {
        var todo = GetById(id);
        if (todo == null) return null;

        if (title != null)
            todo.Title = title;

        if (isCompleted.HasValue)
            todo.IsCompleted = isCompleted.Value;

        return todo;
    }

    public bool Delete(int id)
    {
        var todo = GetById(id);
        if (todo == null) return false;

        _todos.Remove(todo);
        return true;
    }
}
