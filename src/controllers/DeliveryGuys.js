const mongoose = require("mongoose");
const { User } = require("../models");

// Get all delivery guys how were accepted
const getAccepted = async (req, res) => {
  try {
    User.where("role.status")
      .equals("accepted")
      .exec()
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "No accepted delivery guy found" });
        } else {
          res.status(200).json(result);
        }
      });
  } catch (error) {
    res.json(error.message);
  }
};

// // Get all delivery guys how were pending
const getPending = async (req, res) => {
  try {
    User.where("role.status")
      .equals("pending")
      .exec()
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "No pending delivery guy found" });
        } else {
          res.status(200).json(result);
        }
      });
  } catch (error) {
    res.json(error.message);
  }
};

// Get all delivery guys how were refused
const getRefused = async (req, res) => {
  try {
    User.where("role.status")
      .equals("refused")
      .exec()
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "No refused delivery guy found" });
        } else {
          res.status(200).json(result);
        }
      });
  } catch (error) {
    res.json(error.message);
  }
};

// Delete one delivery guy
const deleteDeliveryguy = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(req.body.userId);
    if (user)
      res.status(200).json({ message: "Delivery guy deleted successfully !" });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  getAccepted,
  getPending,
  getRefused,
  deleteDeliveryguy
};
