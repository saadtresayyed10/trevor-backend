import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = { name, email, password };

    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
