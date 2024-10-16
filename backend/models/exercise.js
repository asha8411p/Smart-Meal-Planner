const db = require("../db/connection");

async function addExercise(userId, name, description, calories, duration) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO exercises (user_id, name, description, calories, duration) VALUES (?, ?, ?, ?, ?)`,
      [userId, name, description, calories, duration],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

module.exports = { addExercise };
