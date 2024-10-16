const exercises = require("../models/exercise");

async function saveExercise(userId, name, description, calories, duration) {
  await exercises.addExercise(userId, name, description, calories, duration);
}

async function getExercises(userId) {
  const saved_exercises = await exercises.getExercisesByUserId(userId);
  return saved_exercises;
}

module.exports = { saveExercise, getExercises };
