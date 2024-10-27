// function to create mysql tables if they do not exist

const db = require("./connection");
function setupTables() {
  db.query(
    `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);`,
    (err, result) => {
      if (err) throw err;
      console.log("Table users created");
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS userinfo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      preference VARCHAR(255),
      allergies VARCHAR(1024),
      dietary_restrictions VARCHAR(1024),
      budget FLOAT,
      height FLOAT,
      weight FLOAT,
      exercise_level VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );`,
    (err, result) => {
      if (err) throw err;
      console.log("Table userinfo created");
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS meals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    instructions VARCHAR(2048) NOT NULL,
    calories FLOAT NOT NULL,
    date DATE NOT NULL,
    budget FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`,
    (err, result) => {
      if (err) throw err;
      console.log("Table meals created");
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS ingredients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        meal_id INT,
        name VARCHAR(255) NOT NULL,
        unit VARCHAR(255) NOT NULL,
        quantity FLOAT NOT NULL,
        price FLOAT NOT NULL,
        FOREIGN KEY (meal_id) REFERENCES meals(id)
    );`,
    (err, result) => {
      if (err) throw err;
      console.log("Table ingredients created");
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS saved_meals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    meal_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (meal_id) REFERENCES meals(id)
);`,
    (err, result) => {
      if (err) throw err;
      console.log("Table saved_meals created");
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    calories FLOAT NOT NULL,
    duration FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`,
    (err, result) => {
      if (err) throw err;
      console.log("Table exercises created");
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS saved_exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    exercise_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
  );`,
    (err, result) => {
      if (err) throw err;
      console.log("Table saved_exercises created");
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS shopping_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);`,
    (err, result) => {
      if (err) throw err;
      console.log("Table shopping_list created");
    }
  );
}
module.exports = setupTables;
