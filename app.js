const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors("http://localhost:6600"));
// app.options("http://localhost:6600", cors());
app.use(cors("*"));
require("./Config/db");

const users = require("./Routes/UsersRoutes");
const post = require("./Routes/PostRoutes");
const like = require("./Routes/likeRoutes");
const comment = require("./Routes/commentRoutes");
const status = require("./Routes/statusRouter");
const userLogin = require("./Routes/loginUsers");
const likes = require("./Model/like");

app.use(express.json());
app.use(`/user`, users);
app.use(`/post`, post);
app.use(`/like`, like);
app.use(`/comment`, comment);
app.use(`/status`, status);
app.use(`/userlogin`, userLogin);
app.get("/likes", async (req, res) => {
  likes
    .find()
    .then((result) => {
      res.status(200).json(result);
      console.log("Likes_Fetch_Done");
    })
    .catch((error) => {
      console.log(error, "LikesCan'tFetch...Error");
    });
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "ErrorHandling", "404error.html"));
});
module.exports = app;
