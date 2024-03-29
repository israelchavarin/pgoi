import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  showProfile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/registration", validateSchema(registerSchema), registerUser);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", authRequired, logout);

router.get("/verifytoken", verifyToken);

router.get("/profile", authRequired, showProfile);

export default router;
