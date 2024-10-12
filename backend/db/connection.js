const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // you might need to change this
  password: "vkb58kqj", // and this
  database: "elec5620", // maybe even this
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
