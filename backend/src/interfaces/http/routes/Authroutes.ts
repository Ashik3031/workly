// src/interfaces/http/routes/Authroutes.ts
import { Router } from "express";
import authMiddleware from "../middleware/Authmiddleware";
import roleMiddleware from "../middleware/roleMiddleware";
import { loginSuperAdmin } from "../../../application/usecases/superAdmin/loginSuperAdmin";

const router = Router();

// Super Admin login route
router.post("/super-admin/login", loginSuperAdmin);

router.get(
  "/super-admin/dashboard",
  authMiddleware,
  roleMiddleware("super-admin"),
  (req, res) => {
    res.status(200).json({ message: "Welcome to the Super Admin Dashboard!" });
  }
);

export default router;