import { tool } from "@langchain/core/tools";
import { z } from "zod";
import Menu from "../models/Menu.js";

const menuFields = "name category price dietaryPreference spiceLevel";

function formatDishes(dishes) {
  return dishes.map((dish) => ({
    name: dish.name,
    category: dish.category,
    price: dish.price,
    dietaryPreference: dish.dietaryPreference ?? "Not specified",
    spiceLevel: dish.spiceLevel ?? "Not specified",
  }));
}

export const getMenuTool = tool(
  async () => {
    try {
      const dishes = await Menu.find({ available: true }).select(menuFields).lean();

      if (dishes.length === 0) {
        return "No available dishes were found on the menu.";
      }

      return JSON.stringify(formatDishes(dishes));
    } catch (error) {
      throw new Error(`Unable to fetch the menu: ${error.message}`);
    }
  },
  {
    name: "get_menu",
    description: "Fetch every dish that is currently available from the restaurant menu.",
    schema: z.object({}),
  }
);

export const searchDishesTool = tool(
  async ({ query }) => {
    try {
      const searchPattern = new RegExp(query.trim(), "i");
      const dishes = await Menu.find({
        available: true,
        $or: [{ name: searchPattern }, { category: searchPattern }],
      })
        .select(menuFields)
        .lean();

      if (dishes.length === 0) {
        return `No available dishes matched "${query.trim()}".`;
      }

      return JSON.stringify(formatDishes(dishes));
    } catch (error) {
      throw new Error(`Unable to search dishes: ${error.message}`);
    }
  },
  {
    name: "search_dishes",
    description: "Search available restaurant dishes by dish name or category.",
    schema: z.object({
      query: z.string().trim().min(1, "Search query cannot be empty."),
    }),
  }
);

export const recommendDishesTool = tool(
  async ({ budget, dietaryPreference, spiceLevel }) => {
    try {
      const dishes = await Menu.find({
        available: true,
        price: { $lte: budget },
        dietaryPreference,
        spiceLevel,
      })
        .select(menuFields)
        .lean();

      if (dishes.length === 0) {
        return `No available dishes matched a budget of ${budget}, ${dietaryPreference} preference, and ${spiceLevel} spice level.`;
      }

      return JSON.stringify(formatDishes(dishes));
    } catch (error) {
      throw new Error(`Unable to recommend dishes: ${error.message}`);
    }
  },
  {
    name: "recommend_dishes",
    description: "Recommend available dishes by budget, dietary preference, and spice level.",
    schema: z.object({
      budget: z.number().nonnegative("Budget cannot be negative."),
      dietaryPreference: z.enum(["Veg", "Non-Veg", "Vegan"]),
      spiceLevel: z.enum(["Low", "Medium", "High"]),
    }),
  }
);

export const getMenu = getMenuTool;
export const searchDishes = searchDishesTool;
export const recommendDishes = recommendDishesTool;
