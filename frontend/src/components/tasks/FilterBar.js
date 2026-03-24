// src/components/tasks/FilterBar.js
import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './FilterBar.css';

const CATEGORIES = ['All', 'Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'];
const STATUS_FILTERS = [
  { key: 'All', label: 'All Tasks' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
  { key: 'pinned', label: 'Pinned' },
];

export default function FilterBar() {
  const { filter, categoryFilter, setFilter, setCategory, tasks } = useTasks();

  return (
    <div className="filter-bar">
      <div className="filter-bar__group">
        <span className="filter-bar__label">Status</span>
        <div className="filter-bar__pills">
          {STATUS_FILTERS.map(({ key, label }) => (
            <button
              key={key}
              className={`filter-bar__pill ${filter === key ? 'filter-bar__pill--active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
              {key === 'pending' && (
                <span className="filter-bar__count">
                  {tasks.filter(t => !t.completed).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-bar__group">
        <span className="filter-bar__label">Category</span>
        <div className="filter-bar__pills filter-bar__pills--scroll">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-bar__pill ${categoryFilter === cat ? 'filter-bar__pill--active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
