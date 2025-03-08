// src\api\services\task.service.ts

import { prisma } from "../../lib/prisma";

// Service to create a task
export const createTaskService = async (title: string, description: string) => {
  // Check if task already exists
  const existingTask = await prisma.task.findUnique({ where: { title } });
  if (existingTask) throw new Error("Task already exists");

  return await prisma.task.create({
    data: {
      title,
      description,
    },
  });
};
