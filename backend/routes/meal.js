const express = require("express");
const router = express.Router();
const llmservice = require("../services/llmservice");
const mealService = require("../services/mealService");
const userProfileService = require("../services/userProfileService");

router.get("/suggestion", async (req, res) => {
  const meal = await llmservice.getMealSuggestion();

  res.send(JSON.stringify(meal));
});

// New Route for Profile-Based Meal Suggestions
router.get("/suggestions", async (req, res) => {
  try {
    const userId = req.query.userId;

    // Retrieve user profile data
    const userProfile = await userProfileService.getUserProfile(userId);
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Retrieve all meals and filter based on profile
    const meals = await mealService.getAllMeals();
    const filteredMeals = meals.filter(meal => {
      const hasAllergens = meal.ingredients.some(ingredient =>
        userProfile.allergies.includes(ingredient.name)
      );
      if (hasAllergens) return false;

      if (
        userProfile.dietaryRestrictions.length > 0 &&
        !userProfile.dietaryRestrictions.includes(meal.type)
      ) {
        return false;
      }

      if (userProfile.preference && meal.flavor !== userProfile.preference) {
        return false;
      }

      return meal.budget <= userProfile.budget;
    });

    res.json(filteredMeals);
  } catch (error) {
    console.error("Error fetching meal suggestions:", error);
    res.status(500).json({ message: "Failed to fetch meal suggestions" });
  }
});

router.post("", async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const calories = req.body.calories;
  const date = new Date(); // replace this later if we are scheduling meals
  const budget = req.body.budget;
  const instructions = req.body.instructions;
  const ingredients = req.body.ingredients;
  console.log(userId, name, calories, date, budget, instructions);

  const meal = await mealService.saveMeal(
    userId,
    name,
    calories,
    date,
    budget,
    instructions
  );
  console.log(meal);
  await mealService.addIngredientsToMeal(meal.insertId, ingredients);

  res.send(meal);
});

router.get("", async (req, res) => {
  const userId = req.query.userId;
  const meals = await mealService.getMeals(userId);
  res.send(JSON.stringify(meals));
});

module.exports = router;




//(user_id, name, calories, date, budget)