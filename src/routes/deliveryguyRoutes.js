const express = require("express");
const router = express.Router();

// Require authorization users
const { authorizationRole } = require("../middlewares/autorization");

const { DeliveryGuys, Commands } = require("../controllers");

// Get all commands
router.route("/commands").get(Commands.getCommands);

//
router
  .route("/newCommands")
  .get(authorizationRole("deliveryguy"), Commands.getNewCommands);

  //
router
  .route("/workingCommands/:id")
  .get(authorizationRole("deliveryguy"), Commands.getWorkingCommands);

// Command status
router.route("/status").get(Commands.statusCommand);

// Get all my orders
router
  .route("/myOrders/:id")
  .get(authorizationRole("deliveryguy"), Commands.getMyOrders);

module.exports = router;
