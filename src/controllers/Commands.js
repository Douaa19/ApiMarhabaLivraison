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

// Get all commands by client id
const getCommands = async (req, res) => {
  try {
    const commands = await Command.find();
    if (!commands) res.status(404).json({ message: "Commands not found!" });
    res.status(200).json(commands);
  } catch (error) {
    res.json(error.message);
  }
};

// Get all commands
const getClientCommands = async (req, res) => {
  try {
    const myCom = await Command.find({ client_id: req.body.Id });
    if (!myCom) res.status(404).json({ message: "Commands not found!" });
    res.status(200).json(myCom);
  } catch (error) {
    res.json(error.message);
  }
};

// Get one command by client_id and command_id
const getClientCommand = async (req, res) => {
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

// Get one command by command_id
const getCommand = async (req, res) => {
  try {
    const command = await Command.findById(req.body.command_id);
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

// Update command status
const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    res.json(error.message);
  }
};

// Get all commands with new status
const getNewCommands = async (req, res) => {
  try {
    const newCom = await Command.find({status: "new"});
    if (!newCom) res.status(404).json({ message: "No new commands found" });
    res.status(200).json(newCom);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createCommand,
  getCommands,
  getClientCommands,
  getClientCommand,
  getCommand,
  deleteCommand,
  updateCommand,
  updateStatus,
  getNewCommands,
};
