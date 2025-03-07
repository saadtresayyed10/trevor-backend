// src\api\services\user.service.ts

import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../../lib/token";

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

  const hashedPassword = await bcrypt.hash(password, 10); // Encrypt user's password

  // Register user
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

// Service to login user
export const loginUserService = async (email: string, password: string) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found. Create an account"); // Throw if user doesn't exists

  // Check if password is valid
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Incorrect password. Forgot Password?");

  // Generate token and provide session id to user while signing in
  const token = generateToken(user.user_id);

  return { token, user };
};

// Service to check and retrieve signed-in user's info
export const checkUserProfileService = async (user_id: string) => {
  // Return current user
  return await prisma.user.findUnique({
    where: { user_id },
    select: { name: true, email: true },
  });
};

// Service to delete a user
export const deleteUserService = async (user_id: string) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { user_id } });
  if (!existingUser) throw new Error("User doesn't exist");

  // Delete user
  return await prisma.user.delete({
    where: { user_id },
  });
};
