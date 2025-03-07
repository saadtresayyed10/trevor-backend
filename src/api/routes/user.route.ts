// src\api\routes\user.route.ts

import {
  deleteUserController,
  registerUserController,
} from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", registerUserController);
userRoutes.post("/delete/:user_id", deleteUserController);

export default userRoutes;
