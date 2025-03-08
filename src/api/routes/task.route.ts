// src\api\routes\task.route.ts

import {
  createTaskController,
  getAllTaskController,
  getSingleTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller";
import { Router } from "express";

const taskRoutes = Router();

taskRoutes.post("/", createTaskController);
taskRoutes.get("/", getAllTaskController);
taskRoutes.get("/:task_id", getSingleTaskController);
taskRoutes.put("/:task_id", updateTaskController);
taskRoutes.delete("/:task_id", deleteTaskController);

export default taskRoutes;
