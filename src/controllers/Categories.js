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
  console.log(req.body.name);
  try {
    const newCategory = await Category.findByIdAndDelete({ name: req.body.name });
    if (newCategory)
      res.status(200).json({ message: "Category created successfully !" });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory
};
