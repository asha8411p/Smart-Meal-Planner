// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const setupTables = require("./db/setuptables");
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// create tables if they do not exist
setupTables();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/exercise", require("./routes/exercise"));
app.use("/auth", require("./routes/auth"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
