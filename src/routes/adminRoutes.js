const express = require("express");
const router = express.Router();

// Require authorization users
const { authorizationRole } = require("../middlewares/autorization");

// Require controllers
const {
  Admins,
  Announces,
  Clients,
  Commands,
  DeliveryGuys,
} = require("../controllers");

// Create announce
router.route("/create/announce").post(Announces.createAnnounce);

// Get all announces
router.route("/announces").get(Announces.getAnnounces);

// Get, delete and update announce
router
  .route("/announce")
  .get(Announces.getAnnounce)
  .delete(Announces.deleteAnnounce)
  .put(Announces.updateAnnounce);

// Get all clients
router.route("/clients").get(Clients.getClients);

// Get all delivery guys
router.route("/client/Id").get(Clients.getClient).delete(Clients.deleteClient);

// Get all commands
router.route("/commands").get(Commands.getCommands);

// Get one command
router
  .route("/command/Id")
  .get(Commands.getCommand)
  .put(Commands.updateCommand)
  .delete(Commands.deleteCommand);

// Accept delivery guy
router.route("/acceptDeliveryguy").post(Admins.acceptDeliveryguy);

// Refuse delivery guy
router.route("/refuseDeliveryguy").post(Admins.refuseDeliveryguy);

// Get accepted delivery guy
router.route("/acceptedDeliveryguys").get(DeliveryGuys.getAccepted);

// Get refused delivery guy
router.route("/refusedDeliveryguys").get(DeliveryGuys.getRefused);

module.exports = router;
