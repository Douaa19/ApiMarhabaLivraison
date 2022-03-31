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
  //   images: [{
  //     type: String,
  // }],
});

const Announce = mongoose.model("Announces", Announces);

module.exports = Announce;
