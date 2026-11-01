import { createAgent } from "langchain";

import model from "../config/gemini.js";
import { findDishes } from "../tools/menutools.js";
import { restaurantPrompt } from "./agentprompt.js";

if (!model) {
  throw new Error("GOOGLE_API_KEY must be configured to create the restaurant agent.");
}

export const restaurantAgent = createAgent({
  model,
  tools: [findDishes],
  systemPrompt: restaurantPrompt,
});

export async function invokeRestaurantAgent(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new TypeError("Messages must be a non-empty array.");
  }

  return restaurantAgent.invoke({ messages });
}
