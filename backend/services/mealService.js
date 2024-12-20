const {
  addIngredient,
  getIngredientsByMealId,
} = require("../models/ingredient");
const meals = require("../models/meal");

async function saveMeal(userId, name, calories, date, budget, instructions) {
  const meal = await meals.addMeal(
    userId,
    name,
    calories,
    date,
    budget,
    instructions
  );
  return meal;
}

async function getMeals(userId) {
  const saved_meals = await meals.getMealsByUserId(userId);
  await Promise.all(
    saved_meals.map(async (meal) => {
      const ingredients = await getIngredientsByMealId(meal.id);
      meal.ingredients = ingredients;
    })
  );
  return saved_meals;
}

async function addIngredientsToMeal(mealId, ingredients) {
  for (let ingredient of ingredients) {
    await addIngredient(
      ingredient.name,
      mealId,
      ingredient.quantity,
      ingredient.unit,
      ingredient.price
    );
  }
}

module.exports = { saveMeal, getMeals, addIngredientsToMeal };
