const express = require("express");
const router = express.Router();

const { DeliveryGuys, Commands } = require("../controllers");

// Get all commands
router.route("/delivery").get(Commands.getCommands);

// Get one command
router.route("/command").get(Commands.getCommand);

// 

module.exports = router;
