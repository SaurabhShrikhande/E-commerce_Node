const express = require("express");

const router = express.Router();

const couponController = require("../controler/coupon");
const authMiddleware = require("../middleware/auth");

router.post("/" ,authMiddleware(["admin"]), couponController.createCoupon);

router.get("/", couponController.getCoupon )

module.exports = router;