// src\api\routes\task.route.ts

import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createTaskController,
  getAllTaskController,
  getSingleTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller";
import { Router } from "express";

const taskRoutes = Router();

// Middleware for all task routes
taskRoutes.use(authMiddleware);

taskRoutes.post("/", createTaskController);
taskRoutes.get("/", getAllTaskController);
taskRoutes.get("/:task_id", getSingleTaskController);
taskRoutes.put("/:task_id", updateTaskController);
taskRoutes.delete("/:task_id", deleteTaskController);

export default taskRoutes;
