// src/types/express.d.ts

import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}




declare global {
    namespace Express {
      interface Request {
        user?: {
          id: string;
          role: string;
          
        };
      }
    }
  }
  