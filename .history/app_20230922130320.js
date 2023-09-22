const server = require("./Routes/UsersRoutes");
const post = require("./Routes/PostRoutes");
const port = process.env.PORT || 6600;
const express = require("express");
const app = express();

app.get("users/userdata", server);
app.get()

app.listen(port, () => {
  console.log(`server start with ${port}`);
});
