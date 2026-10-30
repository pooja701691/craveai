import { tool } from "@langchain/core/tools";
import { z } from "zod";
import Menu from "../models/Menu.js";

export const recommendDishes = tool(
  async ({
    budget,
    category,
    foodType,
    spiceLevel
  }) => {
    try {
      const filter = {
        isAvailable: true
      };

      if (budget !== undefined) {
        filter.price = {
          $lte: budget
        };
      }

      if (category) {
        filter.category = category;
      }

      if (foodType) {
        filter.foodType = foodType;
      }

      if (spiceLevel) {
        filter.spiceLevel = spiceLevel;
      }

      const dishes = await Menu.find(filter)
        .select("name description price category foodType spiceLevel")
        .sort({ price: 1 })
        .limit(10)
        .lean();

      return JSON.stringify({
        success: true,
        message: dishes.length
          ? "Matching dishes found"
          : "No matching dishes found",
        total: dishes.length,
        dishes
      });

    } catch (error) {
      return JSON.stringify({
        success: false,
        message: "Recommendation service failed"
      });
    }
  },
  {
    name: "recommend_restaurant_dishes",

    description: `
      Recommend restaurant dishes based on user's budget,
      meal category, dietary preference and spice level.

      Use this tool whenever users ask for personalized food
      recommendations.

      Always respect the given filters.
    `,

    schema: z.object({
      budget: z.number().min(0).optional(),

      category: z.enum([
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snacks",
        "Dessert",
        "Beverages"
      ]).optional(),

      foodType: z.enum([
        "Veg",
        "Non-Veg"
      ]).optional(),

      spiceLevel: z.enum([
        "Low",
        "Medium",
        "High"
      ]).optional()
    })
  }
);
