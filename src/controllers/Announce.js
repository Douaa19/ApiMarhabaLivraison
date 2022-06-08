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
            images: req.file.originalname,
          }).then((response) => {
            res.status(200).json({ message: "New announce created!" });
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
  try {
    const annons = await Announces.find().populate("category_id", "name");
    if (!annons) {
      res.status(400).json({ message: "No announces found" });
    }
    res.status(200).json(annons);
  } catch (error) {
    res.json(error);
  }
};

const getAnnounce = async (req, res) => {
  await Announces.find({ _id: req.params.id })
    .populate("category_id", "name")
    .exec()
    .then((err, result) => {
      if (!result) {
        res.json(err);
      } else {
        console.log(result);
      }
    });
};

const deleteAnnounce = async (req, res) => {
  try {
    await Announces.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "One announce deleted successfully! " });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateAnnounce = async (req, res) => {
  const Id = req.params.id;
  const data = {
    title: req.body.data.title,
    description: req.body.data.description,
    price: req.body.data.price,
    cotegory_id: req.body.data.category_id._id,
  };

  try {
    const category = await Category.findOne({ name: data.category });

    Announces.findByIdAndUpdate(Id, data, (err, response) => {
      if (err) res.status(400).json(err);
      res.status(200).json({ message: "Announce updated seccussefully!" });
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createAnnounce,
  getAnnounces,
  getAnnounce,
  deleteAnnounce,
  updateAnnounce,
};
