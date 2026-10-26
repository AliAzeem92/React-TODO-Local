/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState } from 'react';
import { clearSession, getSession, getUsers, saveSession, saveUsers } from '../utils/storage';
import { hashPassword } from '../utils/hash';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  const login = async ({ email, password }) => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    if (!trimmedEmail || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    try {
      const passwordHash = await hashPassword(password);
      const users = getUsers();
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === trimmedEmail && u.passwordHash === passwordHash
      );

      if (!existingUser) {
        return { success: false, error: 'Invalid email or password.' };
      }

      const session = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      };

      saveSession(session);
      setUser(session);
      return { success: true };
    } catch (err) {
      console.error('[auth] Login error:', err);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const signup = async ({ name, email, password, confirmPassword }) => {
    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      return { success: false, error: 'All fields are required.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }

    try {
      const users = getUsers();
      const emailExists = users.some((u) => u.email.toLowerCase() === trimmedEmail);

      if (emailExists) {
        return { success: false, error: 'This email is already registered.' };
      }

      const passwordHash = await hashPassword(password);
      const newUser = {
        id: crypto.randomUUID(),
        name: trimmedName,
        email: trimmedEmail,
        passwordHash,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      // Log in the newly registered user (session excludes password)
      const session = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      saveSession(session);
      setUser(session);
      return { success: true };
    } catch (err) {
      console.error('[auth] Signup error:', err);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
