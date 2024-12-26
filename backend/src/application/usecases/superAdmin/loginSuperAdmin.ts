// src/application/usecases/loginSuperAdmin.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface LoginRequestBody {
  username: string;
  password: string;
}

export const loginSuperAdmin = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    console.log("Request body:", req.body);
    if (!process.env.SUPER_ADMIN_USERNAME || !process.env.SUPER_ADMIN_PASSWORD) {
        console.error("Missing required environment variables");
      }
      if (!process.env.JWT_SECRET_KEY) {
        console.error("Missing JWT_SECRET_KEY");
      }
    // Hardcoded validation (replace with actual validation logic)
    if (username === process.env.SUPER_ADMIN_USERNAME && password === process.env.SUPER_ADMIN_PASSWORD) {
        console.log("helooo",username,password)
      const user = {
        id: "1",
        username,
        email: "admin@example.com",
        role: "super-admin"
      };

      if (!process.env.JWT_SECRET_KEY) {
        res.status(500).json({ message: "Server configuration error" });
        return;
      }

      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"
      });

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};