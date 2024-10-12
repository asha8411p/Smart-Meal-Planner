const bcrypt = require("bcrypt");
const users = require("../models/users");

async function signup(user) {
  const hashedPwd = await bcrypt.hash(user.password, 10);
  const newUser = {
    username: user.username,
    password: hashedPwd,
    name: user.name,
  };
  await users.signup(newUser);
}

module.exports = { signup };
