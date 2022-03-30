const mongoose = require("mongoose");
const { Commands } = require("../models");

// Get all commands
const getCommands = (req, res) => {
  console.log("Get all commands");
};

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
  getCommands,
  getCommand,
  deleteCommand,
  updateCommand,
};
