import { tool } from "langchain";
import { z } from "zod";
import Menu from "../models/Menu.js";

export const findDishes = tool(
    async ({
        category,
        budget,
        dietary,
        spiceLevel
    }) => {

        const filter = {
            isAvailable: true
        };

        // Category filter
        if (category) {
            filter.category = category;
        }

        // Budget filter
        if (budget) {
            filter.price = { $lte: budget };
        }

        // Dietary preference
        if (dietary === "vegetarian") {
            filter.isVeg = true;
        }

        if (dietary === "non-vegetarian") {
            filter.isVeg = false;
        }

        // Spice level
        if (spiceLevel) {
            filter.spiceLevel = spiceLevel;
        }

        // MongoDB query
        const dishes = await Menu.find(filter)
            .select("name description category price isVeg spiceLevel")
            .limit(10)
            .lean();

        if (dishes.length === 0) {
            return "No matching dishes found.";
        }

        return JSON.stringify(dishes);
    },

    {
        name: "find_dishes",

        description:
            "Find restaurant dishes based on category, budget, dietary preference and spice level.",

        schema: z.object({

            category: z.enum([
                "Breakfast",
                "Lunch",
                "Dinner",
                "Snacks"
            ]).nullable(),

            budget: z.number().nullable(),

            dietary: z.enum([
                "vegetarian",
                "non-vegetarian",
                "any"
            ]),

            spiceLevel: z.enum([
                "Mild",
                "Medium",
                "Hot"
            ]).nullable()

        })
    }
);