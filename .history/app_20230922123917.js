const server = require("./Routes/UsersRoutes");
const port = process.env.PORT || 6600;
const express = require("express");
const app = express();

app.get('/userdata',serv)

app.listen(port, () => {
  console.log(`server start with ${port}`);
});
