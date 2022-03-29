const mongoose = require("mongoose");

const CommandProducts = new mongoose.Schema({
  command_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Command",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  command_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
});

const CommandProduct = mongoose.model("CommandProduct", CommandProducts);

module.exports = CommandProduct;
