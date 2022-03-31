const express = require("express");
const router = express.Router();

// Authorization
const { authorizationRole } = require("../middlewares/autorization");

// // Require controllers
const { Categories } = require("../controllers");

// Get all categories
router.route("/").get(Categories.getCategories).post(Categories.createCategory);

// Delete category
router.route("/Id").delete(Categories.deleteCategory);

module.exports = router;
