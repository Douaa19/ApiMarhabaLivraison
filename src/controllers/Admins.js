const mongoose = require("mongoose");
const { User, Announces } = require("../models");

// Accept delivery guy
const acceptDeliveryguy = async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findById(userId);
    if (user && user.role.status === "pending") {
      user.role.status = "accepted";
      User.findByIdAndUpdate(userId, user, (err, result) => {
        res.json({ message: "Delivery guy accepted!" });
      });
    } else if (user.role.status === "accepted") {
      res.json({ messae: "This delivery guy was already accepted" });
    }
  } catch (error) {
    res.json(error);
  }
};

// Refuse delivery guy
const refuseDeliveryguy = async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findById(userId);
    if (user && user.role.status === "pending") {
      user.role.status = "refused";
      User.findByIdAndUpdate(userId, user, (err, result) => {
        res.status(200).json({ message: "Delivery guy refused!" });
      });
    } else if (user.role.status === "refused") {
      res.json({ messae: "This delivery guy was already refused" });
    }
  } catch (error) {
    res.json(error);
  }
};


module.exports = {
  acceptDeliveryguy,
  refuseDeliveryguy,
};
