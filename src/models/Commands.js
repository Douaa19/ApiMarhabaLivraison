const mongoose = require("mongoose");

const Commands = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    maxlength: [50, "the address must be less than 50 characters"],
  },
  status: {
    type: String,
    enum: ["new", "prepared", "delivered"],
  },
  totale: {
    type: Number,
    required: true,
  },
  delivelyGuy_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Command = mongoose.model("Command", Commands);

module.exports = Command;