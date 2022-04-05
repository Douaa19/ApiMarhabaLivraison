const express = require("express");
const router = express.Router();

const { DeliveryGuys, Commands } = require("../controllers");

// Get all commands
router.route("/commands").get(Commands.getCommands);

//
router.route("/newCommands").get(Commands.getNewCommands);

// Get one command
router.route("/command").get(Commands.getCommand).put(Commands.updateStatus);

// Command status
router.route("/status").get(Commands.statusCommand);

module.exports = router;
