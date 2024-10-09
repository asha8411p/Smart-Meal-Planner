// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const GOOGLE_API_KEY = "AIzaSyA_a8vx9S8BfkyxK4KyhmvemvXa3rhPcBY";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/api/exercise", async (req, res) => {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Give me a suggestion for an exercise.";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  res.send(JSON.stringify(result.response.text()));
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
