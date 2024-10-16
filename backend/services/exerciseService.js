const exercises = require("../models/exercise");

async function saveExercise(userId, name, description, calories, duration) {
  await exercises.addExercise(userId, name, description, calories, duration);
}

module.exports = { saveExercise };
