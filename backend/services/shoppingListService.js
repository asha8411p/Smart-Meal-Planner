const {
  getShoppingListByUserId,
  addToShoppingList,
  deleteIngredient,
  updateIngredient,
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
  const item = await addToShoppingList(userId, name, quantity, price, unit);
  return item[1].insertId; // the id of the ingredient added to the shopping list
}

async function deleteIngredientFromShoppingList(ingredientId) {
  await deleteIngredient(ingredientId);
}

async function updateIngredientInShoppingList(id, name, quantity, price, unit) {
  await updateIngredient(id, name, quantity, price, unit);
}

module.exports = {
  getShoppingList,
  addIngredientToShoppingList,
  deleteIngredientFromShoppingList,
  updateIngredientInShoppingList,
};
