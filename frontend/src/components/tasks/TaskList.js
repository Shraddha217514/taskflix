// src/components/tasks/TaskList.js
import React, { useMemo } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskCard from './TaskCard';
import './TaskList.css';

export default function TaskList() {
  const { tasks, filter, categoryFilter, loading } = useTasks();

  const filtered = useMemo(() => {
    let list = [...tasks];
    if (categoryFilter !== 'All') list = list.filter(t => t.category === categoryFilter);
    if (filter === 'completed') list = list.filter(t => t.completed);
    else if (filter === 'pending') list = list.filter(t => !t.completed);
    else if (filter === 'pinned') list = list.filter(t => t.pinned);
    return list;
  }, [tasks, filter, categoryFilter]);

  const pinned = filtered.filter(t => t.pinned);
  const regular = filtered.filter(t => !t.pinned);

  if (loading) {
    return (
      <div className="task-list__skeleton">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="task-list__skeleton-card" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="task-list__empty">
        <div className="task-list__empty-icon"></div>
        <h3>Nothing to List</h3>
        <p>Add a task above or change your filters</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {pinned.length > 0 && (
        <section className="task-list__section">
          <h2 className="task-list__section-title">
            <span className="task-list__section-line" />
            Pinned
            <span className="task-list__badge">{pinned.length}</span>
          </h2>
          <div className="task-list__grid">
            {pinned.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </section>
      )}

      <section className="task-list__section">
        <h2 className="task-list__section-title">
          <span className="task-list__section-line" />
          {filter === 'All' ? 'All Tasks' : filter === 'completed' ? 'Completed' : filter === 'pending' ? 'Pending' : 'Tasks'}
          <span className="task-list__badge">{regular.length}</span>
        </h2>
        <div className="task-list__grid">
          {regular.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </section>
    </div>
  );
}
