const express = require("express");

const router = express.Router();

const product = require("../controler/product")

const authMiddleware = require("../middleware/auth")


router.post("/", authMiddleware(["admin" , "seller"]) , product.createProduct);

router.get("/", product.getProduct);



router.post("/product-detail-by-id", product.productDetail)   //populte

router.post("/:productId/:action" , authMiddleware(["buyer"]), product.likeDislike);

module.exports = router;

