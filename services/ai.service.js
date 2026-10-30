import { z } from "zod";
import model from "../config/gemini.js";

const messageSchema = z.object({
  message: z.string().trim().min(1, "Message cannot be empty."),
});

export async function testAI(input) {
  const { message } = messageSchema.parse(input);

  if (!model) {
    throw new Error("GOOGLE_API_KEY is not configured in .env.");
  }

  const result = await model.invoke(message);

  if (typeof result.content === "string") {
    return result.content;
  }

  return Array.isArray(result.content)
    ? result.content.map((part) => part.text ?? "").join("")
    : String(result.content);
}
