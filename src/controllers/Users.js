const { User } = require("../models");
const jwt = require("jsonwebtoken");

// Handling register
const handleRegister = (req, res) => {
  console.log("Register method");
};

// Handling login
const handleLogin = (req, res) => {
  console.log("Login method");
};

module.exports = {
  handleRegister,
  handleLogin
};
