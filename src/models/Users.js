const mongoose = require("mongoose");

const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["admin", "client", "server"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "refused"],
  },
});

// Users Schema
const Users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, "the username must be greater than 5 characters"],
    maxlength: [20, "the username must be less than 20 characters"],
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "invalid email format",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "the password must be greater than 5 characters"],
    maxlength: [20, "the password must be less than 20 characters"],
  },
  role: Role,
});

const User = mongoose.module("User", Users);

module.exports = User;
