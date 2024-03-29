const express = require("express");

const router = express.Router();
const orderController = require("../controler/order");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware(["buyer"]), orderController.createOrder);
router.get("/", orderController.getOrder);


module.exports = router;