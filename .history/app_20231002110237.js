const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
app.options("*")
require("./Config/db");

const users = require("./Routes/UsersRoutes");
const post = require("./Routes/PostRoutes");
const like = require("./Routes/likeRoutes");
const comment = require("./Routes/commentRoutes");

app.use(express.json());
app.use(`/users`, users);
app.use(`/post`, post);
app.use(`/like`, like);
app.use(`/comment`, comment);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "ErrorHandling", "404error.html"));
});
module.exports = app;