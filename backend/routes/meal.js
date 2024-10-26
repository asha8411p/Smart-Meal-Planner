const express = require("express");
const router = express.Router();
const llmservice = require("../services/llmservice");
const mealService = require("../services/mealService");

router.get("/suggestion", async (req, res) => {
  const meal = await llmservice.getMealSuggestion();

  res.send(JSON.stringify(meal));
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