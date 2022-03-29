const mongoose = require("mongoose");

const Products = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descriptio: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  images: [{
    type: String,
}],
});

const Product = mongoose.model("Products", Products);

module.exports = Product;
