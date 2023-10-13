const jwt = require("jsonwebtoken");
const secretKey = "iamdoingmyworkinnodejsandreactjs";

const verifyToken = (req, res, next) => {
  try {
    const token = req.body.token || req.headers["authorization"];
    if (!token) {
      res.status(403).send("Access denied, Provide A Token Please.");
      console.log("Access Denied, Token is not Provided");
    }

    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Token is Invalid");
    return res.status(400).send("Token is Invalid");
  }
};

module.exports = verifyToken;
