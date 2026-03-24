// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import HeroBanner from '../components/layout/HeroBanner';
import TaskForm from '../components/tasks/TaskForm';
import FilterBar from '../components/tasks/FilterBar';
import TaskList from '../components/tasks/TaskList';
import './HomePage.css';

export default function HomePage() {
  const { fetchTasks } = useTasks();
  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  return (
    <div className="home">
      <HeroBanner />
      <main className="home__main">
        <div className="home__container">
          <TaskForm />
          <FilterBar />
          <TaskList />
        </div>
      </main>
    </div>
  );
}
