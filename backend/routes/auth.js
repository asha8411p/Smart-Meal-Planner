const express = require("express");
const jwt = require("jsonwebtoken");
const authservice = require("../services/authservice");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
  };

  if (!user.username || !user.password || !user.name) {
    res.status(400).send({ msg: "All fields need to be filled out" });
    return;
  }
  await authservice.signup(user);

  res.send("User added to database");
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send({ msg: "All fields need to be filled out" });
    return;
  }

  const token = await authservice.login(username, password);

  if (!token) {
    res.status(401).send({ msg: "Invalid username or password" });
    return;
  }

  res.send({ token: token });
});

router.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    console.log("Received token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await users.getUserByUsername(decoded.username); // Or use getUserById if needed
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
    

module.exports = router;
