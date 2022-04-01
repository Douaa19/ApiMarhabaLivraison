const mongoose = require("mongoose");
const { Announces, Category } = require("../models");

const createAnnounce = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.category }).then(
      (result) => {
        if (result !== null) {
          Announces.create({
              title: req.body.title,
              description: req.body.description,
              price: req.body.price,
              category_id: result._id,
            }).then((response) => {
              res.json({ message: "New announce created!" });
            });
          } else {
          res
            .status(400)
            .json({ message: "Category not found! You should create it" });
        }
      }
    );
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
  await Announces.findById({ _id: req.body.Id }).then((err, result) => {
    if (!result) res.json(err);
    res.status(200).json(result);
  });
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
