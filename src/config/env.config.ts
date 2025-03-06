import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT,
  dbURL: process.env.DATABASE_URL,
};
