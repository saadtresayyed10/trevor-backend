// src\lib\token.ts

import { env } from "../config/env.config";
import jwt from "jsonwebtoken";

// Generate session token (used in login)
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, env.jwtKey, { expiresIn: "7d" });
};
