// src/components/tasks/TaskCard.js
import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskCard.css';

const PRIORITY_COLORS = { High: '#E50914', Medium: '#F5A623', Low: '#46D369' };
const CATEGORY_ICONS = {
  Work: '💼', Personal: '🏠', Study: '📚',
  Health: '💪', Finance: '💰', Other: '📌'
};

export default function TaskCard({ task }) {
  const { toggleComplete, togglePin, deleteTask } = useTasks();
  const priorityColor = PRIORITY_COLORS[task.priority] || '#808080';
  const icon = CATEGORY_ICONS[task.category] || '📌';

  const created = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  });

  return (
    <div
      className={`task-card ${task.completed ? 'task-card--done' : ''} ${task.pinned ? 'task-card--pinned' : ''}`}
      style={{ '--priority-color': priorityColor }}
    >
      <div className="task-card__priority-bar" />

      <div className="task-card__body">
        <button
          className={`task-card__checkbox ${task.completed ? 'task-card__checkbox--checked' : ''}`}
          onClick={() => toggleComplete(task.id)}
          aria-label="Toggle complete"
        >
          {task.completed && <span>✓</span>}
        </button>

        <div className="task-card__content">
          <p className={`task-card__text ${task.completed ? 'task-card__text--done' : ''}`}>
            {task.text}
          </p>
          <div className="task-card__meta">
            <span className="task-card__category">
              <span className="task-card__icon">{icon}</span>
              {task.category}
            </span>
            <span className="task-card__priority" style={{ color: priorityColor }}>
              {task.priority}
            </span>
            <span className="task-card__date">{created}</span>
          </div>
        </div>
      </div>

      <div className="task-card__actions">
        <button
          className={`task-card__action-btn ${task.pinned ? 'task-card__action-btn--pinned' : ''}`}
          onClick={() => togglePin(task.id)}
          aria-label="Pin task"
          title={task.pinned ? 'Unpin' : 'Pin'}
        >
          📌
        </button>
        <button
          className="task-card__action-btn task-card__action-btn--delete"
          onClick={() => deleteTask(task.id)}
          aria-label="Delete task"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
