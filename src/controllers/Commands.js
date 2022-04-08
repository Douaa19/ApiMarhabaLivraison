const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { Command, CommandProduct, User, Announces } = require("../models");

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

        // Create arrays
        let product_id = [];
        let quantity = [];
        let price = [];
        let totale = [];
        req.body.products.forEach((product) => {
          product_id.push(product.product_id);
          quantity.push(product.quantity);
          price.push(product.price);
          totale.push(product.price * product.quantity);
        });

        CommandProduct.create(
          {
            command_id: response._id,
            product_id: product_id,
            command_price: price,
            quantity: quantity,
            total: totale,
          },
          (err, result) => {
            if (result) {
              let Totale = 0;
              totale.forEach((t) => {
                Totale += t;
              });
              Command.findByIdAndUpdate(
                response._id,
                { totale: Totale },
                (err, response) => {
                  console.log("totale updated!");
                  // if (err) {
                  //   res.json(err);
                  // } else {
                  //   res.json({ message: "Total command is updated!" });
                  // }
                }
              );
            }
          }
        );
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
const deleteCommand = async (req, res) => {
  Command.findById(req.body.Id, (err, result) => {
    if (result) {
      if (result.status === "new") {
        Command.findByIdAndDelete(req.body.Id).then((response) =>
          res.status(200).json({ message: "Command deleted successfully!" })
        );
      } else {
        res.json({ message: "Sorry! You can't delete this command" });
      }
    } else {
      res.status(404).json({ message: "Command not found!" });
    }
  });
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
          res.status(200).json({
            message: "This order is your next move!",
            status: "Order in production",
          });
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
            // Create bill
            CommandProduct.find(
              { command_id: req.body.command_id },
              (err, compro) => {
                User.findById(command[0].client_id, (err, client) => {
                  if (!client)
                    res.status(404).json({ message: "Client not found!" });
                  const clientName = client.username;
                  Announces.find(
                    { _id: compro[0].product_id },
                    (err, products) => {
                      if (!products)
                        res.status(404).json({ message: "Product not found!" });
                      let product_title = [];
                      products.forEach((product) => {
                        product_title.push(product.title);
                      });

                      let Total = 0;
                      compro[0].total.forEach((t) => {
                        Total += t;
                      });
                      let total_quantity = 0;
                      compro[0].quantity.forEach((t) => {
                        total_quantity += t;
                      });

                      const billInfos = {
                        clientName: clientName,
                        address: command[0].address,
                        product_title: product_title,
                        quantity: compro[0].quantity,
                        total_quantity: total_quantity,
                        product_price: compro[0].command_price,
                        Total_price: Total,
                      };

                      const transporter = nodemailer.createTransport({
                        service: "hotmail",
                        auth: {
                          user: "douaa.larif@outlook.fr",
                          pass: "douaalarif1997",
                        },
                      });

                      const mailOptions = {
                        from: '"Douaa Larif" <douaa.larif@outlook.fr>',
                        to: "doua.larif@gmail.com",
                        subject: "Facture",
                        html: `<table>
                            <thead>
                              <tr>
                                <th>Nom de client</th>
                                <th>Adresse</th>
                                <th>Nom repas</th>
                                <th>Quantité</th>
                                <th>Prix</th>
                                <th>Totale</th>
                              </tr>
                            </thead>
                            <tbody>
                                <tr>
                                  <td>${billInfos.clientName}</td>
                                  <td>${billInfos.address}</td>
                                  <td>${billInfos.product_title}</td>
                                  <td>${billInfos.quantity}</td>
                                  <td>${billInfos.product_price}</td>
                                  <td>${billInfos.Total_price}</td>
                                </tr>
                            </tbody>
                          </table>`,
                      };

                      transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                          res.json(error);
                        } else {
                          res.json({ message: "fature send!" });
                        }
                      });
                    }
                  );
                });
              }
            );
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
