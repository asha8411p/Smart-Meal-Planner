const db = require("../db/connection");

async function signup(user) {
  try {
    db.query(
      `INSERT INTO users (username, password, name) VALUES (?, ?, ?)`,
      [user.username, user.password, user.name],
      (err, result) => {
        if (err) throw err;
        console.log("User added to database");
      }
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = { signup };
