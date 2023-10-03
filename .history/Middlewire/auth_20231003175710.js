const jwt = require("jsonwebtoken");
const TOKEN_KEY = "iamdoingmyworkinnodejsandreactjs";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ error: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({e : "Invalid Token"})
  }
  return next();
};

module.exports = verifyToken;