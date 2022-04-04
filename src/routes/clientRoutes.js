const express = require("express");
const router = express.Router();

const { Commands } = require("../controllers");

// Create command
router.route("/create").post(Commands.createCommand);

// Get all commands
router.route("/commands").get(Commands.getClientCommands);

// Get all commands
router
  .route("/command")
  .get(Commands.getClientCommand)
  .put(Commands.updateCommand)
  .delete(Commands.deleteCommand);

module.exports = router;
