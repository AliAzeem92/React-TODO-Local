import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-bell/10 text-blue-bell mb-5">
        <FileQuestion className="h-8 w-8" aria-hidden="true" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-blue-slate">404</h1>
      <h2 className="mt-2 text-xl font-bold text-blue-slate">Page Not Found</h2>
      <p className="mt-2 max-w-sm text-sm text-slate-600">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-bell px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell"
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
