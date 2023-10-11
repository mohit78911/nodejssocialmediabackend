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
    return res.status(400).send("T  
  } 
};

module.exports = verifyToken;
