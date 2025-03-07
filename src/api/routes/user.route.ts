// src\api\routes\user.route.ts

import { authMiddleware } from "../../middleware/auth.middleware";
import {
  checkUserProfileController,
  deleteUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

// Auth routes
userRoutes.post("/register", registerUserController);
userRoutes.post("/login", loginUserController);
userRoutes.post("/logout", logoutUserController);
userRoutes.get("/profile", authMiddleware, checkUserProfileController);

// Delete route
userRoutes.delete("/delete/:user_id", deleteUserController);

export default userRoutes;
