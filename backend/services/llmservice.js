const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function getMealSuggestion() {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Give me a suggestion for a meal.";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  return result.response.text();
}

async function getExerciseSuggestion() {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Give me a suggestion for an exercise.";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  return result.response.text();
}

module.exports = { getMealSuggestion, getExerciseSuggestion };
