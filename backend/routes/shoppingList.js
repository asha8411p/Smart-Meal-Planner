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

  await shoppingListService.addIngredientToShoppingList(
    userId,
    name,
    quantity,
    price,
    unit
  );

  res.send("Ingredient added to shopping list");
});

module.exports = router;
