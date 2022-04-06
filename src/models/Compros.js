const mongoose = require("mongoose");

const CommandProducts = new mongoose.Schema({
  command_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Command",
  },
  product_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  command_price: [
    {
      type: Number,
    },
  ],
  quantity: [
    {
      type: Number,
    },
  ],
  total: [
    {
      type: Number,
    },
  ],
});

const CommandProduct = mongoose.model("CommandProduct", CommandProducts);

module.exports = CommandProduct;
