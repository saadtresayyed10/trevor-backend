// src\api\services\task.service.ts

import { prisma } from "../../lib/prisma";

// Service to create a task
export const createTaskService = async (
  title: string,
  description: string,
  user_id: string
) => {
  // Check if task already exists
  const existingTask = await prisma.task.findUnique({
    where: { title, user_id },
  });
  if (existingTask) throw new Error("Task already exists");

  return await prisma.task.create({
    data: {
      title,
      description,
      user_id,
    },
  });
};

// Service to get all task for a user
export const getAllTaskService = async (user_id: string) => {
  return await prisma.task.findMany({
    where: { user_id },
  });
};

// Service to get single task for a user
export const getSingleTaskService = async (
  user_id: string,
  task_id: string
) => {
  return await prisma.task.findUnique({
    where: { task_id, user_id },
  });
};

// Service to update task
export const updateTaskService = async (
  task_id: string,
  title: string,
  description: string,
  user_id: string
) => {
  // Get the assigned task
  const task = await prisma.task.findUnique({ where: { task_id, user_id } });
  if (!task) throw new Error("Task is not assigned to the user"); // Throw if task is not found

  return await prisma.task.update({
    where: { task_id },
    data: {
      title,
      description,
    },
  });
};

// Service to delete task
export const deleteTaskService = async (task_id: string, user_id: string) => {
  // Get the assigned task
  const task = await prisma.task.findUnique({ where: { task_id, user_id } });
  if (!task) throw new Error("Task is not assigned to the user"); // Throw if task is not found

  return await prisma.task.delete({
    where: { task_id, user_id },
  });
};
