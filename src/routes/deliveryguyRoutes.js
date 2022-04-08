const express = require("express");
const router = express.Router();

const { DeliveryGuys, Commands } = require("../controllers");

// Get all commands
router.route("/commands").get(Commands.getCommands);

//
router.route("/newCommands").get(Commands.getNewCommands);

// Command status
router.route("/status").get(Commands.statusCommand);

module.exports = router;
