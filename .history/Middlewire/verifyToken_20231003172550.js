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

module.exports = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)  [res.status(403).send("Access denied.")];

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
