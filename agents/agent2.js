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
