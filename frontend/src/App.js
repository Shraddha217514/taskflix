// src/App.js
import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/layout/Navbar';

import Toast from './components/common/Toast';
import HomePage from './pages/HomePage';
import './styles/globals.css';

export default function App() {
  return (
    <TaskProvider>
      <Navbar />
      <HomePage />
      <Toast />
    </TaskProvider>
  );
}
