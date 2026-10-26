/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useMemo } from 'react';
import { getTodos, saveTodos } from '../utils/storage';
import { useAuth } from './AuthContext';

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const { user } = useAuth();
  const [todos, setTodos] = useState(() => getTodos());

  // Only show todos belonging to the currently authenticated user
  const userTodos = useMemo(() => {
    if (!user) return [];
    return todos.filter((todo) => todo.userId === user.id);
  }, [todos, user]);

  const addTodo = ({ title, description }) => {
    if (!user) {
      throw new Error('User must be logged in to create a todo');
    }

    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) {
      throw new Error('Todo title is required');
    }

    const timestamp = new Date().toISOString();
    const newTodo = {
      id: crypto.randomUUID(),
      userId: user.id,
      title: trimmedTitle,
      description: (description || '').trim(),
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const nextTodos = [newTodo, ...todos];
    saveTodos(nextTodos);
    setTodos(nextTodos);
    return newTodo;
  };

  const updateTodo = (id, { title, description }) => {
    if (!user) return false;

    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) {
      throw new Error('Todo title is required');
    }

    const timestamp = new Date().toISOString();
    let updated = false;

    const nextTodos = todos.map((todo) => {
      if (todo.id === id && todo.userId === user.id) {
        updated = true;
        return {
          ...todo,
          title: trimmedTitle,
          description: (description || '').trim(),
          updatedAt: timestamp,
        };
      }
      return todo;
    });

    if (updated) {
      saveTodos(nextTodos);
      setTodos(nextTodos);
    }
    return updated;
  };

  const toggleTodo = (id) => {
    if (!user) return;

    const timestamp = new Date().toISOString();
    const nextTodos = todos.map((todo) => {
      if (todo.id === id && todo.userId === user.id) {
        return {
          ...todo,
          completed: !todo.completed,
          updatedAt: timestamp,
        };
      }
      return todo;
    });

    saveTodos(nextTodos);
    setTodos(nextTodos);
  };

  const deleteTodo = (id) => {
    if (!user) return;

    const nextTodos = todos.filter((todo) => !(todo.id === id && todo.userId === user.id));
    saveTodos(nextTodos);
    setTodos(nextTodos);
  };

  const getTodoById = (id) => {
    if (!user) return null;
    return todos.find((todo) => todo.id === id && todo.userId === user.id) || null;
  };

  return (
    <TodoContext.Provider
      value={{
        todos: userTodos,
        allTodosCount: todos.length,
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
        getTodoById,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
