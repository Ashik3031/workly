// src/interfaces/http/middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { User } from "../../../domain/entities/User";

// Create a custom interface extending Request
interface AuthenticatedRequest extends Request {
  user?: User;
}

const roleMiddleware = (requiredRole: User['role']) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Authentication required!" });
        return;
      }

      if (req.user.role !== requiredRole) {
        res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  };
};

export default roleMiddleware;