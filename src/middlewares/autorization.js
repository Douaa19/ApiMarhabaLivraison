require("dotenv").config();
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  const token = req.header("auth-token");
  console.log("Token : " + token);

  if (!token) {
    res.status(401).json({ error: "No token found!" });
  } else {
    try {
      const user = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.tokenData = { id: user.id, role: user.role, username: user.username };
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const authorizationRole = (...roles) => {
  return (req, res, next) => {
    console.log(req.tokenData);
    if (!roles.includes(req.tokenData.role.name)) {
      res.status(401).json({ error: "You are not authorized" });
    } else {
      next();
    }
  };
};

module.exports = {
  authorization,
  authorizationRole,
};
