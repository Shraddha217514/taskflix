// src/context/TaskContext.js
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { taskAPI } from '../services/api';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  stats: { total: 0, completed: 0, pending: 0, pinned: 0 },
  loading: false,
  error: null,
  filter: 'All',
  categoryFilter: 'All',
  toast: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_TASKS': return { ...state, tasks: action.payload, loading: false };
    case 'SET_STATS': return { ...state, stats: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'SET_FILTER': return { ...state, filter: action.payload };
    case 'SET_CATEGORY': return { ...state, categoryFilter: action.payload };
    case 'SHOW_TOAST': return { ...state, toast: action.payload };
    case 'HIDE_TOAST': return { ...state, toast: null };
    default: return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showToast = useCallback((msg, type = 'success') => {
    dispatch({ type: 'SHOW_TOAST', payload: { msg, type } });
    setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3000);
  }, []);

  const fetchTasks = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const [tasks, stats] = await Promise.all([taskAPI.getAll(), taskAPI.getStats()]);
      dispatch({ type: 'SET_TASKS', payload: tasks });
      dispatch({ type: 'SET_STATS', payload: stats });
    } catch {
      // Fallback to localStorage
      const saved = JSON.parse(localStorage.getItem('taskflix_tasks') || '[]');
      dispatch({ type: 'SET_TASKS', payload: saved });
      showToast('Offline mode — using local storage', 'warn');
    }
  }, [showToast]);

  const addTask = useCallback(async (data) => {
    try {
      const task = await taskAPI.create(data);
      dispatch({ type: 'SET_TASKS', payload: [] }); // trigger re-fetch
      await fetchTasks();
      showToast('Task added to your list!');
      return task;
    } catch {
      // Local fallback
      const newTask = { id: Date.now(), ...data, completed: false, pinned: false, createdAt: new Date().toISOString() };
      const updated = [newTask, ...state.tasks];
      localStorage.setItem('taskflix_tasks', JSON.stringify(updated));
      dispatch({ type: 'SET_TASKS', payload: updated });
      showToast('Task saved locally');
    }
  }, [fetchTasks, showToast, state.tasks]);

  const updateTask = useCallback(async (id, updates) => {
    try {
      await taskAPI.update(id, updates);
      await fetchTasks();
    } catch {
      const updated = state.tasks.map(t => t.id === id ? { ...t, ...updates } : t);
      localStorage.setItem('taskflix_tasks', JSON.stringify(updated));
      dispatch({ type: 'SET_TASKS', payload: updated });
    }
  }, [fetchTasks, state.tasks]);

  const deleteTask = useCallback(async (id) => {
    try {
      await taskAPI.delete(id);
      await fetchTasks();
      showToast('Task removed');
    } catch {
      const updated = state.tasks.filter(t => t.id !== id);
      localStorage.setItem('taskflix_tasks', JSON.stringify(updated));
      dispatch({ type: 'SET_TASKS', payload: updated });
      showToast('Task removed locally');
    }
  }, [fetchTasks, showToast, state.tasks]);

  const toggleComplete = useCallback(async (id) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    await updateTask(id, { completed: !task.completed });
    showToast(task.completed ? 'Marked as pending' : '✓ Task completed!');
  }, [state.tasks, updateTask, showToast]);

  const togglePin = useCallback(async (id) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    await updateTask(id, { pinned: !task.pinned });
    showToast(task.pinned ? 'Unpinned' : '📌 Task pinned');
  }, [state.tasks, updateTask, showToast]);

  return (
    <TaskContext.Provider value={{
      ...state,
      fetchTasks, addTask, updateTask, deleteTask, toggleComplete, togglePin,
      setFilter: (f) => dispatch({ type: 'SET_FILTER', payload: f }),
      setCategory: (c) => dispatch({ type: 'SET_CATEGORY', payload: c }),
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
