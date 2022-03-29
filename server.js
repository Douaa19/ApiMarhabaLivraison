require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

require("./src/config/mongoose");
