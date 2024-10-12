const express = require("express");
const router = express.Router();
const llmservice = require("../services/llmservice");

router.get("/suggestion", async (req, res) => {
  const exercise = llmservice.getExerciseSuggestion();

  res.send(JSON.stringify(exercise));
});

module.exports = router;
