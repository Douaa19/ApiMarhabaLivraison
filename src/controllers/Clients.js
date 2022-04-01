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
          res.status(404).json({ message: "No client found!" });
        } else {
          res.status(200).json({ result });
        }
      });
  } catch (error) {
    res.json(error.message);
  }
};

// Get one client
const getClient = (req, res) => {
  
};

// Delete one client
const deleteClient = (req, res) => {
  console.log("Delete one client");
};

module.exports = {
  getClients,
  getClient,
  deleteClient,
};
