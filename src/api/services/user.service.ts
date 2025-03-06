// src\api\services\user.service.ts

import { prisma } from "lib/prisma";
import bcryptjs from "bcryptjs";

// Service to register user
export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) throw new Error("User with this email already exists");

  const hashedPassword = await bcryptjs.hash(password, 10); // Encrypt user's password

  // Register user
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};
