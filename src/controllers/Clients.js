const mongoose = require("mongoose");
const { Clients } = require("../models");

// Get all clients
const getClients = (req, res) => {
  console.log("Get all clients");
};

// Get one client
const getClient = (req, res) => {
  console.log("Get one client");
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
