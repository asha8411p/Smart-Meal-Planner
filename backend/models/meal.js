const db = require("../db/connection");

async function addMeal(userId, name, description, calories, duration) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO exercises (user_id, name, calories, date, budget) VALUES (?, ?, ?, ?, ?)`,
      [userId, name, calories, date, budget],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

async function getMealsByUserId(userId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM meals WHERE user_id = ?`,
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

module.exports = { addMeal, getMealsByUserId };
