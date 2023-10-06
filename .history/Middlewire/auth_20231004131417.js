const jwt = require("jsonwebtoken");
const TOKEN_KEY = "iamdoingmyworkinnodejsandreactjs";

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .json({ error: "A Token Is Required For Authentication" });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
