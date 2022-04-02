const mongoose = require("mongoose");
const { Command } = require("../models");

// Create command
const createCommand = async (req, res) => {
  await Command.create({
    address: req.body.address,
    totale: req.body.totale,
    client_id: req.body.client_id,
    status: "new",
  }).then((response) => {
    res.json({ message: "Command is created!" });
  });
};

// Get all commands
const getCommands = async (req, res) => {};

// Get one command
const getCommand = (req, res) => {
  console.log("Get one command");
};

// Delete one command
const deleteCommand = (req, res) => {
  console.log("Delete one command");
};

// Update one command
const updateCommand = (req, res) => {
  console.log("Update one command");
};

module.exports = {
  createCommand,
  getCommands,
  getCommand,
  deleteCommand,
  updateCommand,
};
