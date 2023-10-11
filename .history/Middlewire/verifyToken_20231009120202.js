const jwt = require("jsonwebtoken");
const secretKey = "iamdoingmyworkinnodejsandreactjs";

const verifyToken = (req, res, next) => {
  try {
    const token = req.body.token || req.headers["authorization"];
    if (!token) {
      res.status(403).send("Access denied, Provide A Token Please.");
      console.log("Access Denied, Token is not Provided");
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Token is Invalid");
  }
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = async function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = req.body.token || req.headers["authorization"]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
