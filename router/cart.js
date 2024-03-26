const express = require("express");

const router = express.Router();

const cartController = require("../controler/cart")

router.post("/", cartController.createCart);

router.get("/", cartController.getCart);

module.exports = router;