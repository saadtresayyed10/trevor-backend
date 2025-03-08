import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Attach the User type to the request
    }
  }
}
