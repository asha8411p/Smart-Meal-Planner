const db = require("../db/connection");

async function getShoppingListByUserId(userId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM shopping_list JOIN ingredients ON shopping_list.ingredient_id = ingredients.id WHERE user_id = ? `,
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

async function addToShoppingList(userId, name, quantity, price, unit) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO ingredients (name, quantity, price, unit) VALUES (?, ?, ?, ?); 
       INSERT INTO shopping_list (user_id, ingredient_id) VALUES (?, LAST_INSERT_ID())`,
      [name, quantity, price, unit, userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

async function deleteIngredient(id) {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM shopping_list WHERE id = ?`, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function updateIngredient(id, name, quantity, price, unit) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE ingredients SET name = ?, quantity = ?, price = ?, unit = ? WHERE id = ?`,
      [name, quantity, price, unit, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

module.exports = {
  getShoppingListByUserId,
  addToShoppingList,
  deleteIngredient,
  updateIngredient,
};
