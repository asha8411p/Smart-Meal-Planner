const {
  getShoppingListByUserId,
  addToShoppingList,
} = require("../models/shoppinglist");

async function getShoppingList(userId) {
  const shoppinglist = await getShoppingListByUserId(userId);
  return shoppinglist;
}

async function addIngredientToShoppingList(
  userId,
  name,
  quantity,
  price,
  unit
) {
  // Add ingredient to shopping list
  await addToShoppingList(userId, name, quantity, price, unit);
}

module.exports = {
  getShoppingList,
  addIngredientToShoppingList,
};
