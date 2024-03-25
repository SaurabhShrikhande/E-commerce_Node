const express = require("express");

const router = express.Router();

const user = require("../controler/user");
const authMiddleware = require("../middleware/auth");



router.post("/register", user.userregister);

router.post("/login", user.userlogin);

router.post("/logout", user.userlogout);



router.post("/wishlist" ,  authMiddleware(["admin","buyer", "seller"]),  user.addProductToWishlist)
router.get("/wishlist" ,  authMiddleware(["admin","buyer", "seller"]),  user.getProductFromWishlist)

module.exports = router;