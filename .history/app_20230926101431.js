 
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors("*"));
require("./Config/db");

const users = require("./Routes/UsersRoutes");
const post = require("./Routes/PostRoutes");
const like = require("./Routes/likeRoutes");

app.use(express.json());
app.use(`/users`, users);
app.use(`/post`, post);
app.use(`/like`, like);

 module