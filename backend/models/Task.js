// models/Task.js
// In-memory model (replace with MongoDB/Mongoose as needed)

let tasks = [];
let nextId = 1;

class Task {
  constructor({ text, category = 'Other', priority = 'Medium' }) {
    this.id = nextId++;
    this.text = text;
    this.category = category;
    this.priority = priority;
    this.completed = false;
    this.pinned = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static getAll() {
    return [...tasks];
  }

  static getById(id) {
    return tasks.find(t => t.id === id) || null;
  }

  static create(data) {
    const task = new Task(data);
    tasks.unshift(task);
    return task;
  }

  static update(id, updates) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...updates, updatedAt: new Date().toISOString() };
    return tasks[idx];
  }

  static delete(id) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  }

  static getStats() {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      pinned: tasks.filter(t => t.pinned).length,
    };
  }
}

module.exports = Task;
