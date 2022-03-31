const { User } = require("../models");
const jwt = require("jsonwebtoken");

// Handling register
const handleRegister = (req, res) => {
  const user = [
    req.body.username,
    req.body.email,
    req.body.role,
    req.body.password,
    req.body.repeated_password,
  ];

  // Check if the password and th repeated password ere the same
  if (user[3] !== user[4]) {
    res.json({ error: "The passwords are not the same!" });
  }

  (async () => {
    try {
      await User.create({
        username: user[0],
        email: user[1],
        role:
          user[2] === "deliveryguy"
            ? { name: user[2], status: "pending" }
            : { name: user[2] },
        password: user[3],
      });
      res.status(200).json({ message: "User is created!" });
    } catch (err) {
      console.log(err);
    }
  })();
};

// Handling login
const handleLogin = (req, res) => {
  console.log("Login method");
};

module.exports = {
  handleRegister,
  handleLogin,
};
