const express = require("express");

const router = express.Router();

const cartController = require("../controler/cart")

const authMiddleware = require("../middleware/auth")

router.post("/", authMiddleware(["user", "admin" , "buyer" ]), cartController.createCart);

router.get("/",  authMiddleware(["user", "admin" , "buyer" ]), cartController.getCart);

module.exports = router;