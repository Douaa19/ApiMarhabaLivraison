require("dotenv").config();
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
  (async () => {
    if (!req.body.email) console.log("email is not here!");
    // Find user's email in the data base
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({ message: "User not found!" });
    } else if (!req.body.password) {
      res.json({ message: "password is not here!" });
    } else {
      await user.comparePasswords(req.body.password).then((result) => {
        if (!result) {
          res.json({ message: "Password in incorrect! Please try again." });
        } else {
          const id = user._id;
          const role = user.role;
          const username = user.username;
          const myToken = jwt.sign(
            { id, role, username },
            process.env.JWT_ACCESS_SECRET
          );
          res.cookie("token", myToken, { httpOnly: true });
          res.json({ token: myToken });
        }
      });
    }
  })();
};

module.exports = {
  handleRegister,
  handleLogin,
};
