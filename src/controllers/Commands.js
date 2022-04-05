const { response } = require("express");
const mongoose = require("mongoose");
const { Command, Announces, CommandProduct } = require("../models");

// Create command
const createCommand = async (req, res) => {
  try {
    Command.create({
      address: req.body.address,
      totale: 0,
      client_id: req.body.client_id,
      status: "new",
    }).then((response) => {
      if (!response) {
        res.json({ message: "Command not created" });
      } else {
        res.json({ message: "Command created!" });
        Announces.findById(req.body.product_id, (err, product) => {
          if (!product) {
            res.json({ message: "Product not found!" });
          } else {
            CommandProduct.create({
              command_id: response._id,
              product_id: product._id,
              command_price: product.price,
              quantity: req.body.quantity,
              total: product.price * req.body.quantity,
            }).then((err, response) => {
              console.log(response);
            });
          }
        });
      }
    });
  } catch (error) {
    res.json(error.message);
  }
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
    const command = await Command.find({ _id: req.body.command_id });
    if (command && command[0].status === "new") {
      command[0].status = "prepared";
      Command.findByIdAndUpdate(
        req.body.command_id,
        {
          address: command[0].address,
          status: command[0].status,
          total: command[0].total,
          client_id: command[0].client_id,
          $set: { delivelyGuy_id: req.body.delivelyGuy_id },
        },
        (err, response) => {
          if (err) res.json(err);
          res.status(200).json({ message: "This order is your next move!" });
        }
      );
    } else if (command && command[0].status === "prepared") {
      if (command[0].delivelyGuy_id == req.body.delivelyGuy_id) {
        // command[0].status = "delivered";
        Command.findByIdAndUpdate(
          req.body.command_id,
          { status: "delivered" },
          (err, response) => {
            if (err) res.json(err);
            res.status(200).json({ message: "Order delivered!" });
          }
        );
      } else {
        res.json({
          message:
            "You don't have the right to change the status of this order!",
        });
      }
    } else if (command && command[0].status === "delivered") {
      if (command[0].delivelyGuy_id == req.body.delivelyGuy_id) {
        // command[0].status = "delivered";
        Command.findByIdAndUpdate(
          req.body.command_id,
          { status: "lunched" },
          (err, response) => {
            if (err) res.json(err);
            res.status(200).json({ message: "Order lunched!" });
          }
        );
      } else {
        res.json({
          message:
            "You don't have the right to change the status of this order!",
        });
      }
    }
  } catch (error) {
    res.json(error);
  }
};

// Get all commands with new status
const getNewCommands = async (req, res) => {
  try {
    const newCom = await Command.find({ status: "new" });
    if (!newCom) res.status(404).json({ message: "No new commands found" });
    res.status(200).json(newCom);
  } catch (error) {
    res.json(error.message);
  }
};

// Get status command
const statusCommand = async (req, res) => {
  const command = await Command.findOne({ _id: req.body.command_id });
  if (!command) res.status(404).json({ message: "Command no found!" });
  if (
    command.client_id == req.body.client_id &&
    command.delivelyGuy_id == req.body.delivelyGuy_id
  ) {
    res.status(200).json(command.status);
  } else {
    res.json({ message: "You don't have the permission to see status order" });
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
  statusCommand,
};
