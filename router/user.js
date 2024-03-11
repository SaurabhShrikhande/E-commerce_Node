const express = require("express");

const router = express.Router();

const user = require("../controler/user")



router.post("/register", user.userregister);

router.post("/login", user.userlogin);

router.post("/logout", user.userlogout);





module.exports = router;