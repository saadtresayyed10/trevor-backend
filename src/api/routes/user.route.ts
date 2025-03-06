import { registerUser } from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/user", registerUser);

export default userRoutes;
