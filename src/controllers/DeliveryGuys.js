const mongoose = require("mongoose");
const { User } = require("../models");

// Gat all delivery guys how were accepted
const getAccepted = async (req, res) => {
  try {
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
  } catch (error) {
    res.json(error.message);
  }
};

// Gat all delivery guys how were refused
const getRefused = async (req, res) => {
  try {
    User.where("role.status")
      .equals("refused")
      .exec()
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "No refused delivery guy found" });
        } else {
          res.status(200).json({ result });
        }
      });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  getAccepted,
  getRefused,
};
