// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/taskController');

// GET /api/tasks        - all tasks (supports ?category=Work&filter=pending)
// POST /api/tasks       - create task
// GET /api/tasks/stats  - get stats
// GET /api/tasks/:id    - single task
// PATCH /api/tasks/:id  - update task
// DELETE /api/tasks/:id - delete task

router.get('/stats', ctrl.getStats);
router.get('/', ctrl.getAllTasks);
router.post('/', ctrl.createTask);
router.get('/:id', ctrl.getTaskById);
router.patch('/:id', ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);

module.exports = router;
