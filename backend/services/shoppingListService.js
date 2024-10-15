const { getShoppingListByUserId } = require("../models/shoppinglist");

async function getShoppingList(userId) {
  const shoppinglist = await getShoppingListByUserId(userId);
  return shoppinglist;
}

module.exports = {
  getShoppingList,
};
