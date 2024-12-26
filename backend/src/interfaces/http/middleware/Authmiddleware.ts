// src/interfaces/http/middleware/Authmiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from '../../../domain/entities/User';

interface RequestWithUser extends Request {
  user?: User;
}

const authMiddleware = (
  req: RequestWithUser, 
  res: Response, 
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Authentication required!" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as User;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token!" });
    return;
  }
};

export default authMiddleware;