const mongoose = require("mongoose");
const { Category } = require("../models");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories)
      res.status(400).json({ message: "There are no categories!" });
    res.status(200).json(categories);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Get all categories
const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create({ name: req.body.name });
    if (newCategory)
      res.status(200).json({ message: "Category created successfully !" });
  } catch (error) {
    res.json({ error });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.body.id);
    if (category)
      res.status(200).json({ message: "Category deleted successfully !" });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
