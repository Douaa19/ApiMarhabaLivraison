const express = require("express");
const router = express.Router();

const { Commands } = require("../controllers");

const { authorizationRole } = require("../middlewares/autorization");

// Create command
router.route("/create").post(Commands.createCommand);

// Get all commands
router.route("/commands").get(Commands.getClientCommands);

// Get all commands
router
  .route("/command/:id")
  .get(Commands.getClientCommand)
  .put(Commands.updateCommand)
  .delete(authorizationRole("admin", "client"), Commands.deleteCommand)
  .get(Commands.getCommand)

router
.route("/updateStatus/:command_id")
  .put(authorizationRole("deliveryguy"), Commands.updateStatus);

module.exports = router;
