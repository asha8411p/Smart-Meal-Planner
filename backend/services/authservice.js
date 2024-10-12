const bcrypt = require("bcrypt");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

async function signup(user) {
  const hashedPwd = await bcrypt.hash(user.password, 10);
  const newUser = {
    username: user.username,
    password: hashedPwd,
    name: user.name,
  };
  await users.signup(newUser);
}

async function login(username, password) {
  const user = await users.getUserByUsername(username);
  if (!user) {
    return false;
  }
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return false;
  }
  const tokenPayload = {
    username: user.username,
    name: user.name,
    id: user.id,
  };
  const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "1h" });
  return token;
}

module.exports = { signup, login };
