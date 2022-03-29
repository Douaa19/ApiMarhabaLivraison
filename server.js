require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

// require mongoose
require("./src/config/mongoose");

// require Routes
const authentificationRoutes = require("./src/routes/authentificationRoutes");

// app.use("/auth", authentificationRoutes);

// using middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Mahaba livraison!!",
  });
});

app.listen(PORT, () =>
  console.log(`server is running at : http://localhost:${PORT}`)
);
