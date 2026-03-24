// src/components/common/Toast.js
import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './Toast.css';

export default function Toast() {
  const { toast } = useTasks();
  if (!toast) return null;
  return (
    <div className={`toast toast--${toast.type || 'success'}`}>
      <span className="toast__icon">{toast.type === 'warn' ? '⚠' : '✓'}</span>
      {toast.msg}
    </div>
  );
}
