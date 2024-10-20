const express = require("express");
const router = express.Router();
const shoppingListService = require("../services/shoppingListService");

router.get("/", async (req, res) => {
  const userId = req.query.id;
  const shoppingList = await shoppingListService.getShoppingList(userId);

  res.send(JSON.stringify(shoppingList));
});

router.post("/", async (req, res) => {
  const userId = req.query.id;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const unit = req.body.unit;

  const id = await shoppingListService.addIngredientToShoppingList(
    userId,
    name,
    quantity,
    price,
    unit
  );

  res.send(JSON.stringify({ id: id }));
});

router.put("/", async (req, res) => {
  const name = req.body.name;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const unit = req.body.unit;
  const id = req.body.id;
  await shoppingListService.updateIngredientInShoppingList(
    id,
    name,
    quantity,
    price,
    unit
  );
  res.send("Ingredient updated in shopping list");
});

router.delete("/", async (req, res) => {
  const ingredientId = req.query.id;

  await shoppingListService.deleteIngredientFromShoppingList(ingredientId);

  res.send("Ingredient deleted from shopping list");
});


module.exports = router;
