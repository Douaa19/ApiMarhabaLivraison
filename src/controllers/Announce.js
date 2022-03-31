const mongoose = require("mongoose");
const { Announces } = require("../models");

const createAnnounce = async (req, res) => {
  const announce = {};
  try {
    await Announces.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    }).then((response) => {
      res.json({ message: "New announce created!" });
    });
  } catch (error) {
    res.json(error.message);
  }
};

const getAnnounces = async (req, res) => {
  const annons = await Announces.find();
  if (!annons) {
    res.status(400).json({ message: "No announces found" });
  }
  res.status(200).json(annons);
};

const getAnnounce = async (req, res) => {
  
};

const deleteAnnounce = async (req, res) => {
  try {
    await Announces.findByIdAndDelete({ _id: req.body.Id });
    res.status(200).json({ message: "One announce deleted successfully! " });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateAnnounce = (req, res) => {
  console.log("Update announce");
};

module.exports = {
  createAnnounce,
  getAnnounces,
  getAnnounce,
  deleteAnnounce,
  updateAnnounce,
};
