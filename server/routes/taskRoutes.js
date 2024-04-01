const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/add", authMiddleware, taskController.createTask);
router.get("/tasks", authMiddleware, taskController.getAllTasksForUser);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.delete("/delete/:id", authMiddleware, taskController.deleteTask);
router.put("/update/:id", authMiddleware, taskController.updateTask);

module.exports = router;
