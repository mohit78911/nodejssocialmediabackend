// const jwt = require("jsonwebtoken");
// const secretKey = "iamdoingmyworkinnodejsandreactjs";

// verifyToken = function (req, res, next) {
//   const token = req.headers["authorization"];
//   if (token) {
//     token = token.split(" ");
//     console.log("middlewareCalled if", token);
//     jwt.verify(token[1], secretKey, (err, valid) => {
//       if (err) {
//         res.send({ result: "Please Provide Valid Token" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.send({ result: "Please add token with header" });
//   }
// };

// module.exports = verifyToken;

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
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
