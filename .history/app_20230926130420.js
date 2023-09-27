const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors("*"));
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

const joi = require("joi");
const Schema = joi.object({
  name: joi.string().min(2).max(5).required(),
  dob : joi.number().required()
});
const data = {
    name : "m",
    dob : 14042000
}
const joi.valid
module.exports = app;
