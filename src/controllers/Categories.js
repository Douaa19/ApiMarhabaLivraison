const mongoose = require("mongoose");
const { Category } = require("../models");

// Get all categories
const getCategories = (req, res) => {
  try {
    const categories = Category.find();
    if (!categories)
      res.status(400).json({ message: "There are no categories!" });
    res.status(200).json(categories);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Get all categories
const createCategory = (req, res) => {};

module.exports = {
  getCategories,
  createCategory,
};
