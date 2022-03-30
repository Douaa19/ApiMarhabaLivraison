const express = require("express");
const router = express.Router();

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
router.route("/").get(Announces.getAnnounces);

// Get, delete and update announce
router
  .route("/announce/Id")
  .get(Announces.getAnnounce)
  .delete(Announces.deleteAnnounce)
  .put(Announces.updateAnnounce);

// Get all clients
// router.route("/clients").get(Clients.getClients);

// Get all delivery guys
// router.route("/client/Id").get(Clients.getClient).delete(Clients.deleteClient);

// Get all commands
// router.route("/commands").get(Commands.getCommands);

// Get one command
// router.route("/command/Id").get(Commands.getCommand);

// Accept delivery guy
// router.route("/acceptDeliveryguy/Id").post(Admins.acceptDeliveryguy)

// Refuse delivery guy
// router.route("/refuseDeliveryguy/Id").post(Admins.refuseDeliveryguy)

// Get accepted delivery guy
// router.route("/acceptedDeliveryguy").get(DeliveryGuys.getAccepted);

// Get refused delivery guy
// router.route("/refusedDeliveryguy").get(DeliveryGuys.getRefused);

module.exports = router;
