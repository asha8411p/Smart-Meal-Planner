const express = require("express");
const router = express.Router();
const shoppingListService = require("../services/shoppingListService");

router.get("/", async (req, res) => {
  const userId = req.query.id;
  const shoppingList = await shoppingListService.getShoppingList(userId);

  res.send(JSON.stringify(shoppingList));
});

module.exports = router;
