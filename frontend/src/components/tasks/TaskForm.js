// src/components/tasks/TaskForm.js
import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskForm.css';

const CATEGORIES = ['Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function TaskForm() {
  const { addTask } = useTasks();
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    await addTask({ text, category, priority });
    setText('');
    setLoading(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__header">
        <span className="task-form__label">New Task</span>
        <span className="task-form__hint">Press Enter or click Add</span>
      </div>
      <div className="task-form__row">
        <input
          className="task-form__input"
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={loading}
          maxLength={200}
          autoComplete="off"
        />
        <select
          className="task-form__select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          className="task-form__select task-form__select--priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          data-priority={priority.toLowerCase()}
        >
          {PRIORITIES.map(p => <option key={p} value={p}>{p} Priority</option>)}
        </select>
        <button className="task-form__btn" type="submit" disabled={loading || !text.trim()}>
          {loading ? <span className="task-form__spinner" /> : '+ Add Task'}
        </button>
      </div>
    </form>
  );
}
