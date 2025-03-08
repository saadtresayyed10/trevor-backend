// src\api\controllers\task.controller.ts

import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { createTaskService } from "../services/task.service";

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
