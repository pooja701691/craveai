import { testAI } from "../services/ai.service.js";
import { ZodError } from "zod";

export async function testAIController(req, res) {
  try {
    const response = await testAI(req.body);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues[0]?.message ?? "Invalid request.",
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to generate an AI response.",
    });
  }
}
