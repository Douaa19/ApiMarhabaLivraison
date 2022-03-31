require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;

// require mongoose
require("./src/config/mongoose");

const cookieParser = require("cookie-parser");
const { authorization } = require("./src/middlewares/autorization");

// require Routes
const authentificationRoutes = require("./src/routes/authentificationRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
// const clientRoutes = require("./src/routes/clientRoutes");
// const deliverygayRoutes = require("./src/routes/deliveryguyRoutes");
// const commandRoutes = require("./src/routes/commandRoutes");
// const announceRoutes = require("./src/routes/announceRoutes");

// app.use("/auth", authentificationRoutes);

// using middlewares
// app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Mahaba livraison!!",
  });
});

// app.use(authorization);

// Routes
app.use("/auth", authentificationRoutes);
app.use("/admin", adminRoutes);
app.use("/category", categoryRoutes);

app.listen(PORT, () =>
  console.log(`server is running at : http://localhost:${PORT}`)
);
