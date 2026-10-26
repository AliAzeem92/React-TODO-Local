const STORAGE_KEYS = {
  USERS: 'todo_app_users',
  SESSION: 'todo_app_session',
  TODOS: 'todo_app_todos',
};

/**
 * Safely retrieve and parse an item from localStorage.
 * Handles missing keys or corrupted JSON gracefully.
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    const rawValue = window.localStorage.getItem(key);
    if (rawValue === null || rawValue === undefined) {
      return defaultValue;
    }
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`[storage] Error reading key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely serialize and store an item in localStorage.
 */
export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[storage] Error writing key "${key}":`, error);
    return false;
  }
}

/**
 * Safely remove an item from localStorage.
 */
export function removeStorageItem(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[storage] Error removing key "${key}":`, error);
    return false;
  }
}

/**
 * Get all registered users from storage.
 * Ensures the return value is always an Array.
 */
export function getUsers() {
  const users = getStorageItem(STORAGE_KEYS.USERS, []);
  return Array.isArray(users) ? users : [];
}

/**
 * Save users list to storage.
 */
export function saveUsers(users) {
  return setStorageItem(STORAGE_KEYS.USERS, Array.isArray(users) ? users : []);
}

/**
 * Get currently authenticated session.
 * Returns { id, name, email } or null.
 */
export function getSession() {
  const session = getStorageItem(STORAGE_KEYS.SESSION, null);
  if (session && typeof session === 'object' && session.id && session.email) {
    return session;
  }
  return null;
}

/**
 * Save authenticated session to storage.
 * Note: Never store the password in session.
 */
export function saveSession(session) {
  return setStorageItem(STORAGE_KEYS.SESSION, session);
}

/**
 * Remove authenticated session (Logout).
 */
export function clearSession() {
  return removeStorageItem(STORAGE_KEYS.SESSION);
}

/**
 * Get all todos from storage.
 * Ensures the return value is always an Array.
 */
export function getTodos() {
  const todos = getStorageItem(STORAGE_KEYS.TODOS, []);
  return Array.isArray(todos) ? todos : [];
}

/**
 * Save todos list to storage.
 */
export function saveTodos(todos) {
  return setStorageItem(STORAGE_KEYS.TODOS, Array.isArray(todos) ? todos : []);
}
