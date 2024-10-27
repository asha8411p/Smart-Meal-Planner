const mysql = require("mysql2");

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: "root", // you might need to change this
  password: "jungkook", // and this
  database: "elec5620", // maybe even this
  multipleStatements: true,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
