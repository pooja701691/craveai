import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent } from "langchain";

import { getMenu } from "../tools/menuTools.js";

import {
  recommendDishes
} from "../tools/recommendationTools.js";

import systemPrompt from "../prompts/systemPrompt.js";

// 1. Initialize Gemini model

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",

  temperature: 0.3,

  apiKey: process.env.GOOGLE_API_KEY
});

// 2. Register tools

const tools = [
  getMenu,
  recommendDishes
];

// 3. Create AI agent

const restaurantAgent = createAgent({
  model,

  tools,

  systemPrompt
});

// 4. Function to get AI response

export const getAIResponse = async (
  userMessage,
  previousMessages = []
) => {

  try {

    const messages = [
      ...previousMessages.map((msg) => ({
        role: msg.role === "assistant"
          ? "assistant"
          : "user",

        content: msg.content
      })),

      {
        role: "user",
        content: userMessage
      }
    ];

    // Invoke LangChain agent

    const result = await restaurantAgent.invoke({
      messages
    });

    // Get final AI response

    const lastMessage =
      result.messages[result.messages.length - 1];

    return lastMessage.content;

  } catch (error) {

    console.error("AI Service Error:", error);

    throw new Error("Unable to generate AI response");
  }
};