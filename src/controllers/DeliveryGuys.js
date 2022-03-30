const mongoose = require("mongoose");
const { Users } = require("../models");

// Gat all delivery guys how were accepted
const getAccepted = (req, res) => {
    console.log("Get all accepted delivery guys");
}

// Gat all delivery guys how were refused
const getRefused = (req, res) => {
    console.log("Get all refused delivery guys");
}

module.exports = {
    getAccepted,
    getRefused,
}
