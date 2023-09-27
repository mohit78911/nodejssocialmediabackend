const port = process.env.PORT || 6600;
const express = require("express");
const app = express();
require("./Config/db");

const users = require("./Routes/UsersRoutes");
const post = require("./Routes/PostRoutes");
const router = require('./')

app.use(express.json());
app.use(router);
app.use(`/users`, users);
// app.use(`/post`, post);

app.listen(port, () => {
  console.log(`server start with ${port}`);
});
