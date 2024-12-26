import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../../types/express"; // Adjust path

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Authorization token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as {
      id: string;
      email: string;
    };
    req.user = decoded; // Add decoded user details to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
