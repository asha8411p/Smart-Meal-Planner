const db = require("../db/connection");

async function addMeal(userId, name, calories, date, budget, instructions) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO meals (user_id, name, calories, date, budget, instructions) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, name, calories, date, budget, instructions],
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

async function getAllMeals() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM meals", (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}



module.exports = { addMeal, getMealsByUserId, getAllMeals };
