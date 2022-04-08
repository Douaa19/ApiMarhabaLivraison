require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;

// require mongoose
require("./src/config/mongoose");

const { authorization } = require("./src/middlewares/autorization");

// require Routes
const {
  authentificationRoutes,
  adminRoutes,
  announceRoutes,
  commandRoutes,
  clientRoutes,
  categoryRoutes,
  deliverygayRoutes,
} = require("./src/routes");

// using middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", authentificationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Mahaba livraison!!",
  });
});

app.use(authorization);

// Routes
app.use("/auth", authentificationRoutes);
app.use("/admin", adminRoutes);
app.use("/category", categoryRoutes);
app.use("/clients", clientRoutes);
app.use("/delivery", deliverygayRoutes);
app.use("/announce", announceRoutes);
app.use("/command", commandRoutes);

app.listen(PORT, () =>
  console.log(`server is running at : http://localhost:${PORT}`)
);
