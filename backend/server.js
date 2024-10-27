// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const setupTables = require("./db/setuptables");
const { google } = require("googleapis");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// create tables if they do not exist
setupTables();

// Google OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/exercise", require("./routes/exercise"));
app.use("/auth", require("./routes/auth"));
app.use("/meal", require("./routes/meal"));
app.use("/shopping-list", require("./routes/shoppingList"));
app.use("/profile", require("./routes/profile"));

// Google OAuth routes
app.get("/auth/google", (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  console.log("Redirecting to Google OAuth URL:", authUrl); // Debugging line
  res.redirect(authUrl);
});

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  try {
    // Exchange the authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Redirect to frontend with the access token in the URL
    res.redirect(`http://localhost:3000/dashboard?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`);
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    res.status(500).json({ error: error.message });
  }
});

// Calendar event route
app.get("/calendar/events", async (req, res) => {
  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const events = await calendar.events.list({
      calendarId: 'primary',
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.json(events.data.items);
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({ error: error.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("OAuth Client ID:", process.env.CLIENT_ID); // Debugging line
  console.log("Redirect URI:", process.env.REDIRECT_URI); // Debugging line
});
