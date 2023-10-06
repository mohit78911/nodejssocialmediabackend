// const express = require("express");
// const app = express();
// const cors = require("cors");
// const path = require("path");
// app.use(cors("http://localhost:6600"));
// // app.options("http://localhost:6600", cors());
// require("./Config/db");

// const users = require("./Routes/UsersRoutes");
// const post = require("./Routes/PostRoutes");
// const like = require("./Routes/likeRoutes");
// const comment = require("./Routes/commentRoutes");
// const status = require("./Routes/statusRouter");
// const userLogin = require("./Routes/loginUsers");

// app.use(express.json());
// app.use(`/user`, users);
// app.use(`/post`, post);
// app.use(`/like`, like);
// app.use(`/comment`, comment);
// app.use(`/status`, status);
// app.use(`/userlogin`, userLogin);

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "ErrorHandling", "404error.html"));
// });
// module.exports = app;



// const express = require("express");
// const multer = require("multer");

// const app = express();

// // Set up Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
//     );
//   },
// });

// const upload = multer({ storage });

// // Serve HTML form
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// // Handle file upload
// app.post("/upload", upload.single("profilePicture"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   res.send("File uploaded successfully.");
// });

// module.exports = app;
