const express = require("express");
const router = express.Router();

// // Require controllers
const { Categories } = require("../controllers");

// Get all categories
router.route("/").get(Categories.getCategories);

// Create category
router.route("/create").post(Categories.createCategory);

module.exports = router;
