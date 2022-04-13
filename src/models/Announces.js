const mongoose = require("mongoose");

const Announces = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
    images: {
      type: String,
      default: null
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Announce = mongoose.model("Announces", Announces);

module.exports = Announce;
