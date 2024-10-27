const express = require("express");
const jwt = require("jsonwebtoken");
const profileService = require("../services/profileService");

const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    console.log("Received token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await profileService.getUserByUsername(decoded.username); // Assuming the profileService handles this
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.username, // Assuming username is the email
      userID: user.id,
    });
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res.status(401).json({ msg: "Invalid token" });
  }
});

module.exports = router;
