const express = require("express");
const router = express.Router();
const llmservice = require("../services/llmservice");
const exerciseService = require("../services/exerciseService");

router.get("/suggestion", async (req, res) => {
  const exercise = await llmservice.getExerciseSuggestion();

  res.send(JSON.stringify(exercise));
});
router.post("", async (req, res) => {
  const userId = req.query.userId;
  const name = req.body.name;
  const description = req.body.description;
  const calories = req.body.calories;
  const duration = req.body.duration;

  exerciseService.saveExercise(userId, name, description, calories, duration);

  res.send("Exercise added to shopping list");
});
router.get("", async (req, res) => {
  const userId = req.query.userId;
  const exercises = await exerciseService.getExercises(userId);
  res.send(JSON.stringify(exercises));
});

module.exports = router;
