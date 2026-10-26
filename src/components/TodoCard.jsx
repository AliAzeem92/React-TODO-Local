import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useTodos } from '../context/TodoContext';

export default function TodoCard({ todo }) {
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <article
      className={`group flex items-start gap-3.5 rounded-xl border p-4 transition-all duration-200 ${
        todo.completed
          ? 'border-slate-200 bg-slate-50/70 opacity-80'
          : 'border-slate-200 bg-white hover:border-maya-blue hover:shadow-sm'
      }`}
    >
      <div className="pt-0.5">
        <input
          type="checkbox"
          id={`todo-check-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          className="h-5 w-5 cursor-pointer rounded border-slate-300 accent-[#1fa2ff] text-blue-bell focus:ring-2 focus:ring-blue-bell focus:ring-offset-1"
        />
      </div>

      <div className="min-w-0 flex-1">
        <label
          htmlFor={`todo-check-${todo.id}`}
          className={`block text-base font-medium leading-snug cursor-pointer transition-colors ${
            todo.completed ? 'line-through text-slate-400' : 'text-blue-slate'
          }`}
        >
          {todo.title}
        </label>

        {todo.description && (
          <p
            className={`mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed ${
              todo.completed ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {todo.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Link
          to={`/todos/${todo.id}/edit`}
          aria-label={`Edit todo "${todo.title}"`}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-bell focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
          aria-label={`Delete todo "${todo.title}"`}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
