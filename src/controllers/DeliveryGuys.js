const mongoose = require("mongoose");
const { User } = require("../models");

// Gat all delivery guys how were accepted
const getAccepted = async (req, res) => {
  User.where("role.status")
    .equals("accepted")
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "No accepted delivery guy found" });
      } else {
        res.status(200).json({ result });
      }
    });
};

// Gat all delivery guys how were refused
const getRefused = (req, res) => {
  console.log("Get all refused delivery guys");
};

module.exports = {
  getAccepted,
  getRefused,
};
