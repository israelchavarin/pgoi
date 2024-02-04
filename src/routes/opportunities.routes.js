import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getOpportunities,
  getOpportunity,
  updateOpportunity,
} from "../controllers/opportunities.controller.js";

const router = Router();

router.get("/opportunities", authRequired, getOpportunities);

router.get("/opportunities/:oppId", authRequired, getOpportunity);

router.patch("/opportunities/:oppId/invest", authRequired, updateOpportunity);

export default router;
