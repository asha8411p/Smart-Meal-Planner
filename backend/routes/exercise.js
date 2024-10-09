const express = require("express");

const router = express.Router();
const GOOGLE_API_KEY = "AIzaSyA_a8vx9S8BfkyxK4KyhmvemvXa3rhPcBY";
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.get("/", async (req, res) => {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Give me a suggestion for an exercise.";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  res.send(JSON.stringify(result.response.text()));
});

module.exports = router;
