import { Router } from "express";
const router = Router();

router.get("/");
router.get("/opportunities/:id");

export default router;
