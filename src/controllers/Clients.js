const mongoose = require("mongoose");
const { User } = require("../models");

// Get all clients
const getClients = (req, res) => {
  try {
    User.where("role.name")
      .equals("client")
      .exec()
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "No clients found!" });
        } else {
          res.status(200).json(result);
        }
      });
  } catch (error) {
    res.json(error.message);
  }
};

// Get one client
const getClient = async (req, res) => {
  try {
    const client = await User.findById({ _id: req.params.id });
    if (!client) {
      res.status(404).json({ message: "Client not found!" });
    } else {
      if (client.role.name === "client") {
        res.status(200).json(client);
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

// Delete one client
const deleteClient = (req, res) => {
  try {
    User.findByIdAndDelete({ _id: req.params.id }).then((response) => {
      res.json({ message: "Client delete seccussfully!" });
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  getClients,
  getClient,
  deleteClient,
};
