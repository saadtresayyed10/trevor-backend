// src\api\controllers\user.controller.ts

import { AuthRequest } from "middleware/auth.middleware";
import {
  checkUserProfileService,
  deleteUserService,
  loginUserService,
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

// Controller to login user
export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUserService(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ success: true, loginUser: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to logout user
export const logoutUserController = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to check info of signed-in user
export const checkUserProfileController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const user = await checkUserProfileService(req.user.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
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
    }

    const deleteUser = await deleteUserService(user_id);

    res.status(200).json({
      success: true,
      data: `${deleteUser.name} deleted successfully`,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
