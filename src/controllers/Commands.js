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
const getCommands = async (req, res) => {
  try {
    const myCom = await Command.find({ client_id: req.body.Id });
    console.log(myCom);
  } catch (error) {
    res.json(error.message);
  }
};

// Get one command
const getCommand = async (req, res) => {
  try {
    const command = await Command.find({
      $and: [{ _id: req.body.command_id }, { client_id: req.body.client_id }],
    });
    if (command) {
      res.status(200).json(command);
    } else {
      res.status(404).json({ message: "Command not found!" });
    }
  } catch (error) {
    res.json(error.message);
  }
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
