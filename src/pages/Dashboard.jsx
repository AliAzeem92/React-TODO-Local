import { Link } from 'react-router-dom';
import { Plus, ClipboardList } from 'lucide-react';
import Navbar from '../components/Navbar';
import TodoCard from '../components/TodoCard';
import { useTodos } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { todos } = useTodos();

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-slate">
              My Tasks
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Welcome, <span className="font-semibold text-blue-slate">{user?.name}</span>!{' '}
              {todos.length > 0 ? (
                <span>
                  You have completed{' '}
                  <span className="font-semibold text-blue-bell">{completedCount}</span> of{' '}
                  <span className="font-semibold">{todos.length}</span>{' '}
                  {todos.length === 1 ? 'task' : 'tasks'}.
                </span>
              ) : (
                'Organize and track your daily activities.'
              )}
            </p>
          </div>

          <Link
            to="/todos/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-bell px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:brightness-105 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell focus-visible:ring-offset-2"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Add New</span>
          </Link>
        </div>

        {/* Todo List / Empty State */}
        <section aria-label="Task list" className="mt-6">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#72c3fd]/20 text-blue-bell mb-4">
                <ClipboardList className="h-8 w-8" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold text-blue-slate">No tasks found</h2>
              <p className="mt-1.5 max-w-sm text-sm text-slate-500">
                You haven&apos;t created any tasks yet. Click below to add your first task and stay organized.
              </p>
              <Link
                to="/todos/new"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-bell px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Create your first task</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
