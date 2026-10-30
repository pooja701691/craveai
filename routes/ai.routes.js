import express from "express";
import { testAIController } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/test", testAIController);

export default router;
