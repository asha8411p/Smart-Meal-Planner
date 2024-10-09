// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/exercise", require("./routes/exercise"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
