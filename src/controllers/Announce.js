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

const getAnnounce = (req, res) => {
  console.log("Get one announce");
};

const deleteAnnounce = (req, res) => {
  console.log("Delete announce");
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
