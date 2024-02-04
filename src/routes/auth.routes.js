import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  showProfile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/registration", registerUser);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", authRequired, showProfile);

export default router;
