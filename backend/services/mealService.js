const meals = require("../models/meal");

async function saveMeal(userId, name, calories, date, budget) {
  await meals.addMeal(userId, name, calories, date, budget);
}

async function getMeals(userId) {
  const saved_meals = await meals.getMealsByUserId(userId);
  return saved_meals;
}

module.exports = { saveMeal, getMeals };
