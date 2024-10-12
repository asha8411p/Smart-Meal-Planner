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

async function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE username = ?`,
      [username],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result[0]);
      }
    );
  });
}

module.exports = { signup, getUserByUsername };
