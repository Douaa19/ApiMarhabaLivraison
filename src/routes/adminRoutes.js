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
  uploadImage,
} = require("../controllers");

// Create announce
router
  .route("/create/announce")
  .post(
    authorizationRole("admin"),
    uploadImage.single("image"),
    Announces.createAnnounce
  );

// Get all clients
router.route("/clients").get(authorizationRole("admin"), Clients.getClients);

// Get all commands
router.route("/commands").get(authorizationRole("admin"), Commands.getCommands);

// Accept delivery guy
router
  .route("/acceptDeliveryguy")
  .post(authorizationRole("admin"), Admins.acceptDeliveryguy);

// Refuse delivery guy
router
  .route("/refuseDeliveryguy")
  .post(authorizationRole("admin"), Admins.refuseDeliveryguy);

// Get accepted delivery guy
router
  .route("/acceptedDeliveryguys")
  .get(authorizationRole("admin"), DeliveryGuys.getAccepted);

// Get pending delivery guy
router
  .route("/pendingDeliveryguys")
  .get(authorizationRole("admin"), DeliveryGuys.getPending);

// Get refused delivery guy
router
  .route("/refusedDeliveryguys")
  .get(authorizationRole("admin"), DeliveryGuys.getRefused);

// Delete delivery guy
router
  .route("/deleteDeliveryguy/:id")
  .delete(authorizationRole("admin", DeliveryGuys.deleteDeliveryguy));

module.exports = router;
