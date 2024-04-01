const Task = require("../models/task.model");
// Create a new task for the authenticated user
const createTask = async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.user._id;

    // Create task
    const newTask = new Task({ user: userId, task });
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all tasks for the authenticated user
const getAllTasksForUser = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find tasks for the user
    const tasks = await Task.find({ user: userId });
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// Update a task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task: updatedTask } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.task = updatedTask;
    await task.save();

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// delete task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createTask,
  getAllTasksForUser,
  getTaskById,
  updateTask,
  deleteTask,
};
