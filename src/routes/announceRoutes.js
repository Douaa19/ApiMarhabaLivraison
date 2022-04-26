const express = require("express");
const router = express.Router();

// Require authorization users
const { authorizationRole } = require("../middlewares/autorization");

// Require controllers
const { Announces } = require("../controllers");

// Get all announces
router.route("/announces").get(Announces.getAnnounces);

// Get, delete and update announce
router
  .route("/announce/:id")
  .get(Announces.getAnnounce)
  .delete(authorizationRole("admin"), Announces.deleteAnnounce)
  .put(authorizationRole("admin"), Announces.updateAnnounce);

module.exports = router;
