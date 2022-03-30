const mongoose = require("mongoose");
const { Announces } = require("../models");

const createAnnounce = (req, res) => {
  console.log("Create announce");
};

const getAnnounces = (req, res) => {
  console.log("Get all announces");
};

const getAnnounce = (req, res) => {
  console.log("Get one announce");
};

const deleteAnnounce = (req, res) => {
  console.log("Delete announce");
};

const updateAnnounce = (req, res) => {
  console.log("Update announce");
};

module.exports = {
  createAnnounce,
  getAnnounces,
  getAnnounce,
  deleteAnnounce,
  updateAnnounce,
};
