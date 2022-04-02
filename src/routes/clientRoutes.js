const express = require("express");
const router = express.Router();

const { Commands } = require("../controllers");

// Create command
router.route("/create").post(Commands.createCommand);

// Get all commands
router.route("/commands").get(Commands.getCommands);

// Get all commands
router
  .route("/command")
  .get(Commands.getCommand)
  .delete(Commands.deleteCommand);

module.exports = router;
