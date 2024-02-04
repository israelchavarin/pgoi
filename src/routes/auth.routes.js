import { Router } from "express";
import { registerUser, login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register-user", registerUser);

router.post("/login", login);

router.post("/logout", logout);

export default router;
