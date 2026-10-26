import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      errors.email = 'Email is required.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setGeneralError('');

    const result = await login({
      email: trimmedEmail,
      password: formData.password,
    });

    setIsSubmitting(false);

    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setGeneralError(result.error || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1fa2ff]/10 via-[#72c3fd]/15 to-[#3c627c]/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-bell text-white shadow-md">
            <CheckSquare className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-blue-slate">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Sign in to access your personal task dashboard
          </p>
        </div>

        {generalError && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
          >
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-semibold text-blue-slate"
            >
              Email address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-blue-slate placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-bell/30 ${
                fieldErrors.email
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-bell'
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-1 text-xs font-medium text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-semibold text-blue-slate"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'password-error' : undefined}
              className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-blue-slate placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-bell/30 ${
                fieldErrors.password
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-bell'
              }`}
            />
            {fieldErrors.password && (
              <p id="password-error" className="mt-1 text-xs font-medium text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-bell py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell focus-visible:ring-offset-2"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-bell transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell rounded"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
