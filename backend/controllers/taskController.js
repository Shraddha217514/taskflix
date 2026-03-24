// controllers/taskController.js
const Task = require('../models/Task');

exports.getAllTasks = (req, res) => {
  const { category, filter } = req.query;
  let tasks = Task.getAll();
  if (category && category !== 'All') {
    tasks = tasks.filter(t => t.category === category);
  }
  if (filter === 'completed') tasks = tasks.filter(t => t.completed);
  if (filter === 'pending') tasks = tasks.filter(t => !t.completed);
  if (filter === 'pinned') tasks = tasks.filter(t => t.pinned);
  res.json({ success: true, data: tasks });
};

exports.getTaskById = (req, res) => {
  const task = Task.getById(parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  res.json({ success: true, data: task });
};

exports.createTask = (req, res) => {
  const { text, category, priority } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Task text is required' });
  }
  const task = Task.create({ text: text.trim(), category, priority });
  res.status(201).json({ success: true, data: task });
};

exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const task = Task.update(id, req.body);
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  res.json({ success: true, data: task });
};

exports.deleteTask = (req, res) => {
  const deleted = Task.delete(parseInt(req.params.id));
  if (!deleted) return res.status(404).json({ success: false, message: 'Task not found' });
  res.json({ success: true, message: 'Task deleted' });
};

exports.getStats = (req, res) => {
  res.json({ success: true, data: Task.getStats() });
};
