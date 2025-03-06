// src\api\controllers\user.controller.ts

import { registerUserService } from "../services/user.service";
import { Request, Response } from "express";

// Controller to register user
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(500).json({
        success: false,
        message: "Name, Email and Password cannot be left empty",
      });
    }

    const user = await registerUserService(name, email, password);

    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
