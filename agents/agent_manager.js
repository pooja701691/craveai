
import { createAgent } from "langchain";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

import { menuAgent } from "./menuagent.js";
import { orderAgent } from "./orderagent.js";

// 1. Manager LLM
const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});

// 2. Agent response extract karne ka function
function extractResponse(result) {
  const lastMessage = result?.messages?.at(-1);
  const content = lastMessage?.content;

  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) =>
        typeof part === "string" ? part : part.text || ""
      )
      .join("");
  }

  return JSON.stringify(content ?? result);
}

// 3. Menu Agent Routing Tool
const callMenuAgent = new DynamicStructuredTool({
  name: "call_menu_agent",

  description: `
    Use this tool for menu-related requests:
    - Find dishes
    - Check food prices
    - Recommend food
    - Check vegetarian options
    - Check spice levels
    - Check dish availability
  `,

  schema: z.object({
    userMessage: z.string().min(1),
  }),

  func: async ({ userMessage }) => {
    const result = await menuAgent.invoke({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return extractResponse(result);
  },
});

// 4. Order Agent Routing Tool
const callOrderAgent = new DynamicStructuredTool({
  name: "call_order_agent",

  description: `
    Use this tool for order-related requests:
    - Add items to cart
    - Remove items from cart
    - Update quantity
    - View cart
    - Place order
    - Check order status

    Never claim an order is placed unless
    the Order Agent confirms it.
  `,

  schema: z.object({
    userMessage: z.string().min(1),
  }),

  func: async ({ userMessage }) => {
    const result = await orderAgent.invoke({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return extractResponse(result);
  },
});

// 5. Agent Manager
export const agentManager = createAgent({
  model,

  tools: [
    callMenuAgent,
    callOrderAgent,
  ],

  systemPrompt: `
    You are the Agent Manager of Crave AI.

    Your responsibility is to understand user intent
    and delegate the request to the correct agent.

    RULES:

    1. For menu, food search, price and recommendation
       requests, call call_menu_agent.

    2. For cart, quantity, ordering and order status
       requests, call call_order_agent.

    3. If a request needs menu information first and
       then ordering, you may call both agents in sequence.

    4. Do not invent menu items or prices.

    5. Do not claim an order was placed without
       confirmation from Order Agent.

    6. Respond naturally and conversationally.

    7. Do not perform database operations yourself.
  `,
});

// 6. Function to use in API
export async function runAgentManager(userMessage) {
  const result = await agentManager.invoke({
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  return extractResponse(result);
}
