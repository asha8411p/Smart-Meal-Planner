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

module.exports = { getShoppingListByUserId };
