import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../context/TodoContext';

export default function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodoById, updateTodo } = useTodos();

  const todo = getTodoById(id);

  const handleUpdate = ({ title, description }) => {
    updateTodo(id, { title, description });
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {!todo ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4">
                <AlertCircle className="h-7 w-7" aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold text-blue-slate">Todo not found</h1>
              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                The task you are looking for does not exist or belongs to another user.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-bell px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="border-b border-slate-200 pb-5">
                <h1 className="text-2xl font-bold tracking-tight text-blue-slate">
                  Edit Task
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Update your task details below.
                </p>
              </div>

              <div className="mt-6">
                <TodoForm
                  initialValues={{
                    title: todo.title,
                    description: todo.description,
                  }}
                  onSubmit={handleUpdate}
                  submitLabel="Update Task"
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
