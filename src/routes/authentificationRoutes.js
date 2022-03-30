const express = require("express");
router = express.Router();

// require controller user
const { Users } = require("../controllers");

router.route("/register").post(Users.handleRegister);

router.route("/login");

module.exports = router;
