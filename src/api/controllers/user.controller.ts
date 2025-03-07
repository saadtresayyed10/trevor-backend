// src\api\controllers\user.controller.ts

import {
  deleteUserService,
  registerUserService,
} from "../services/user.service";
import { Request, Response } from "express";

// Controller to register user
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Name, Email and Password cannot be left empty",
      });
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password should not be less than 8 characters",
      });
    }

    const user = await registerUserService(name, email, password);

    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to delete user
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      res.status(400).json({
        success: false,
        message: "User ID is required",
      });

      const deleteUser = await deleteUserService(user_id);

      res
        .status(200)
        .json({
          success: true,
          data: `${deleteUser.name} deleted successfully`,
        });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
