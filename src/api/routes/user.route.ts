import { registerUserController } from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", registerUserController);

export default userRoutes;
