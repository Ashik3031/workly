import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const superAdminUsername = process.env.SUPER_ADMIN_USERNAME || "";
const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || "";
const jwtSecret = process.env.JWT_SECRET || "";



export const superAdminLogin = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === superAdminUsername && password === superAdminPassword) {
    const token = jwt.sign({ role: "super_admin" }, jwtSecret, { expiresIn: "1h" });
    return res.status(200).json({ message: "Login successful", token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};
