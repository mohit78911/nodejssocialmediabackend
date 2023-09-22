const port = process.env.PORT || 6600;
const express = require("express");
const app = express();

const users = require("./Routes/UsersRoutes");
const post = require("./Routes/PostRoutes");
const api = process.env.API_URL
app.use(`${api}/users`, server);
app.use("/userpost", post);

app.listen(port, () => {
  console.log(`server start with ${port}`);
});
