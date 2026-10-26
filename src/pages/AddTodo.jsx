import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../context/TodoContext';

export default function AddTodo() {
  const navigate = useNavigate();
  const { addTodo } = useTodos();

  const handleSave = ({ title, description }) => {
    addTodo({ title, description });
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-blue-slate">
              Add New Task
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Create a new task to stay on top of your responsibilities.
            </p>
          </div>

          <div className="mt-6">
            <TodoForm
              onSubmit={handleSave}
              submitLabel="Create Task"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
