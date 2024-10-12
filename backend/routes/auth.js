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

module.exports = router;
