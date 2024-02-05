import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getOrders, makeDeposit } from "../controllers/users.controller.js";

const router = Router();

router.get("/users/:user_id/orders", authRequired, getOrders);

router.patch("/users/:user_id/deposit", authRequired, makeDeposit);

export default router;
