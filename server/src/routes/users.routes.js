import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getOrders, makeDeposit } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { depositSchema } from "../schemas/users.schema.js";

const router = Router();

router.get("/profile/orders", authRequired, getOrders);

router.patch(
  "/profile/deposit",
  authRequired,
  validateSchema(depositSchema),
  makeDeposit
);

export default router;
