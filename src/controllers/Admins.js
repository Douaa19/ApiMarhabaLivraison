const mongoose = require("mongoose");
const { Users, Announce } = require("../models");

// Accept delivery guy
const acceptDeliveryguy = (req, res) => {
  console.log("Accept delivery guy");
};

// Refuse delivery guy
const refuseDeliveryguy = (req, res) => {
  console.log("Refuse delivery guy");
};

module.exports = {
  acceptDeliveryguy,
  refuseDeliveryguy,
};
