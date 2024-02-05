import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getOpportunities,
  getOpportunity,
  updateOpportunity,
} from "../controllers/opportunities.controller.js";

const router = Router();

router.get("/opportunities", authRequired, getOpportunities);

router.get("/opportunities/:opportunity_id", authRequired, getOpportunity);

router.patch(
  "/opportunities/:opportunity_id/invest",
  authRequired,
  updateOpportunity
);

export default router;
