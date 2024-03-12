const express = require("express");

const router = express.Router();

const product = require("../controler/product")

const authMiddleware = require("../middleware/auth")


router.post("/", authMiddleware(["admin" , "seller"]) , product.createProduct);

router.get("/", product.getProduct);


module.exports = router;

