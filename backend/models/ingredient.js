const db = require("../db/connection");

async function addIngredient(name, mealId, quantity, unit, price) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO ingredients (name, meal_id, quantity, unit, price) VALUES (?, ?, ?, ?, ?)`,
      [name, mealId, quantity, unit, price],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

async function getIngredientsByMealId(mealId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM ingredients WHERE meal_id = ?`,
      [mealId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

module.exports = { addIngredient, getIngredientsByMealId };
