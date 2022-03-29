const mongoose = require("mongoose");

const Categories = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Category = mongoose.model("Category", Categories);

module.exports = Category;
