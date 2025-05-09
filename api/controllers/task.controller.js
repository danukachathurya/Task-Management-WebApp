import Task from '../models/task.model.js';
import { errorHandler } from '../utils/error.js';

// Create new task
export const createTask = async (req, res, next) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

// Get all tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

// Get single task
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return next(errorHandler(404, 'Task not found'));
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTask) return next(errorHandler(404, 'Task not found'));
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error in updateTask:", error);  // Log the actual error
    next(error);  // Pass the error to the error handler
  }
};


// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json('Task deleted successfully');
  } catch (error) {
    next(error);
  }
};
