// src\api\controllers\task.controller.ts

import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import {
  createTaskService,
  deleteTaskService,
  getAllTaskService,
  getSingleTaskService,
  updateTaskService,
} from "../services/task.service";

// Controller to add task to a user
export const createTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const user_id = req.user.id;

    if (!title || !description) {
      res.status(500).json({
        success: false,
        message: "Title and description fields are required",
      });
    }

    if (!user_id) {
      res.status(500).json({ success: false, message: "User ID not found" });
    }

    const task = await createTaskService(title, description, user_id);
    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get all task to a user
export const getAllTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user.id;

    const task = await getAllTaskService(user_id);
    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get single task to a user
export const getSingleTaskController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { task_id } = req.params;
    const user_id = req.user.id;

    const task = await getSingleTaskService(user_id, task_id);
    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to update task to a user
export const updateTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const { task_id } = req.params;
    const { title, description } = req.body;
    const user_id = req.user.id;

    if (!title || !description) {
      res.status(500).json({
        success: false,
        message: "Title and description fields are required",
      });
    }

    if (!user_id) {
      res.status(500).json({ success: false, message: "User ID not found" });
    }

    const task = await updateTaskService(task_id, title, description, user_id);
    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to delete task to a user
export const deleteTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const { task_id } = req.params;
    const user_id = req.user.id;

    const task = await deleteTaskService(task_id, user_id);
    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
