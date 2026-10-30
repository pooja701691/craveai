import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = process.env.GOOGLE_API_KEY
  ? new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.3,
    })
  : null;

export default model;
