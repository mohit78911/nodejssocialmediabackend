// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     res.status(401).json({
//       status: "fail",
//       message: "Unauthorized!",
//     });
//   }
//   const token = authHeader.split(" ")[1];
//   try {
//     const user = jwt.verify(token, "SECRET");
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       status: "fail",
//       message: "Unauthorized!",
//     });
//   }
// };

// function verifyUserToken(req, res, next) {
//   const bearerHeader = req.headers["Authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// }

// module.exports = verifyUserToken;

const jwt = require("jsonwebtoken");
const secretKey = "iamdoingmyworkinnodejsandreactjs";

const verifyToken = (req, res, next) => {
  try {
    const token = req.body.token || req.headers["authorization"];
    if (!token) {
      res.status(403).send("Access denied, ");
      console.log("Access denied, Token is not provided");
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};

module.exports = verifyToken;
