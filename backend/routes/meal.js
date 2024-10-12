const express = require("express");
const router = express.Router();
const llmservice = require("../services/llmservice");

router.get("/suggestion", async (req, res) => {
  const meal = await llmservice.getMealSuggestion();

  res.send(JSON.stringify(meal));
});

module.exports = router;
