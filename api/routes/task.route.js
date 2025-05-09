import express from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';

const router = express.Router();

// Create a task (admin or authorized users)
router.post('/add', createTask);

// Get all tasks
router.get('/all', getTasks);

// Get single task
router.get('/:taskId', getTask);

// Update task
router.put('/update/:taskId', updateTask);

// Delete task
router.delete('/delete/:taskId', deleteTask);

export default router;
