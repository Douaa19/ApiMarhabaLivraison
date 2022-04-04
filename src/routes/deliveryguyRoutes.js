const express = require("express");
const router = express.Router();

const { DeliveryGuys, Commands } = require("../controllers");

// Get all commands
router.route("/commands").get(Commands.getCommands);

// Get one command
router.route("/command").get(Commands.getCommand).put(Commands.updateStatus);

// 

module.exports = router;
