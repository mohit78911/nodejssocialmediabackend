const server = require("./Routes/UsersRoutes");
const post
const port = process.env.PORT || 6600;
const express = require("express");
const app = express();

app.get("users/userdata", server);

app.listen(port, () => {
  console.log(`server start with ${port}`);
});
