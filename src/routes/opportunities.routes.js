import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getOpportunities,
  getOpportunity,
  updateOpportunity,
} from "../controllers/opportunities.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { investSchema } from "../schemas/opportunities.schema.js";

const router = Router();

router.get("/profile/opportunities", authRequired, getOpportunities);

router.get(
  "/profile/opportunities/:opportunity_id",
  authRequired,
  getOpportunity
);

router.patch(
  "/profile/opportunities/:opportunity_id/invest",
  authRequired,
  validateSchema(investSchema),
  updateOpportunity
);

export default router;
