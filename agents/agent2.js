import { menuAgent } from "./menuAgent.js";
import { orderAgent } from "./orderAgent.js";

// Agent 1: Menu Recommendation Agent
export const runMenuAgent = async (userMessage, context = {}) => {
  try {
    const response = await menuAgent.invoke({
      input: userMessage,
      context,
    });

    return {
      success: true,
      agent: "MenuRecommendationAgent",
      response: response.output,
    };
  } catch (error) {
    console.error("Menu Agent Error:", error);

    return {
      success: false,
      agent: "MenuRecommendationAgent",
      message: "Unable to recommend dishes right now.",
    };
  }
};

// Agent 2: Order Assistant Agent
export const runOrderAgent = async (userMessage, context = {}) => {
  try {
    const response = await orderAgent.invoke({
      input: userMessage,
      context,
    });

    return {
      success: true,
      agent: "OrderAssistantAgent",
      response: response.output,
    };
  } catch (error) {
    console.error("Order Agent Error:", error);

    return {
      success: false,
      agent: "OrderAssistantAgent",
      message: "Unable to process your order right now.",
    };
  }
};

// Main Agent Manager
export const agentManager = async (userMessage, context = {}) => {
  const message = userMessage.toLowerCase();

  if (
    message.includes("order") ||
    message.includes("add to cart") ||
    message.includes("quantity") ||
    message.includes("checkout")
  ) {
    return await runOrderAgent(userMessage, context);
  }

  return await runMenuAgent(userMessage, context);
};