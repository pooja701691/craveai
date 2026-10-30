import express from "express";

import {
  chatWithAssistant,
  getChatHistory
} from "../controllers/chatcontroller.js";

const router = express.Router();

// Send message to AI

router.post("/", chatWithAssistant);

// Get previous chat history

router.get("/:conversationId", getChatHistory);

export default router;