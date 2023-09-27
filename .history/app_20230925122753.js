const port = process.env.PORT || 6600;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors("*"));
require("./Config/db");

const users = require("./Routes/UsersRoutes");
const post = require("./Routes/PostRoutes");

app.use(express.json());
app.use(`/users`, users);
app.use(`/post`, post);
app.use()

app.listen(port, () => {
  console.log(`server start with ${port}`);
});
