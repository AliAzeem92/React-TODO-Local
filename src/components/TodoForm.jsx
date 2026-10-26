import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TodoForm({
  initialValues = { title: '', description: '' },
  onSubmit,
  submitLabel = 'Save Todo',
  isSubmitting = false,
}) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Title is required.');
      return;
    }

    setError('');
    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="todo-title" className="block text-sm font-semibold text-blue-slate">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g., Complete project report"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'title-error' : undefined}
          className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-blue-slate placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-bell/30 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-blue-bell'
          }`}
          autoFocus
        />
        {error && (
          <p id="title-error" className="mt-1.5 text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="todo-description" className="block text-sm font-semibold text-blue-slate">
          Description <span className="text-xs font-normal text-slate-500">(optional)</span>
        </label>
        <textarea
          id="todo-description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add any extra notes or details..."
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-blue-slate placeholder-slate-400 transition-colors focus:border-blue-bell focus:outline-none focus:ring-2 focus:ring-blue-bell/30"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Link
          to="/"
          className="inline-flex justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-blue-slate transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-lg bg-blue-bell px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell focus-visible:ring-offset-2"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
