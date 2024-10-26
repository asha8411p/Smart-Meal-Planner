const meals = require("../models/meal");

async function saveMeal(userId, name, calories, date, budget, instructions) {
  await meals.addMeal(userId, name, calories, date, budget, instructions);
}

async function getMeals(userId) {
  const saved_meals = await meals.getMealsByUserId(userId);
  return saved_meals;
}

module.exports = { saveMeal, getMeals };
