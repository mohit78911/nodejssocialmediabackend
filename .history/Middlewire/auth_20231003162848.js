const jwt = require("jsonwebtoken");
const secretKey = "iamdoingmyworkinnodejsandreactjs";

verifyToken = function (req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    token = token.split(" ");
    console.log("middlewareCalled if", token);
    jwt.verify(token[]1, secretKey, (err, valid) => {
      if (err) {
        res.send({ result: "Please Provide Valid Token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "Please add token with header" });
  }
};

module.exports = verifyToken;
