const express = require("express");
const router = express.Router();

const { Commands, Clients } = require("../controllers");

const { authorizationRole } = require("../middlewares/autorization");

// Command status
router.route("/status").get(Commands.statusCommand);

// Get and delete one client
router
  .route("/client/:id")
  .get(authorizationRole("admin"), Clients.getClient)
  .delete(authorizationRole("admin"), Clients.deleteClient);

module.exports = router;
