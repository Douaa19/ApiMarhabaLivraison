const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["admin", "client", "deliveryguy"],
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

Users.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  });
});

Users.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", Users);

module.exports = User;
