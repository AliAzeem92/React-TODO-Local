import { Link } from 'react-router-dom';
import { CheckSquare, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-blue-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell rounded-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-bell text-white shadow-sm transition-transform group-hover:scale-105">
            <CheckSquare className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-xl font-bold tracking-tight text-blue-slate">
            Task<span className="text-blue-bell">Flow</span>
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-blue-slate">
              <User className="h-4 w-4 text-blue-bell" aria-hidden="true" />
              <span className="max-w-[150px] truncate" title={user.name}>
                {user.name}
              </span>
            </div>

            <button
              type="button"
              onClick={logout}
              aria-label="Log out of your account"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-blue-slate transition-colors hover:border-maya-blue hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bell"
            >
              <LogOut className="h-4 w-4 text-blue-slate" aria-hidden="true" />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
