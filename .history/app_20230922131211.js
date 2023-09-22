
const port = process.env.PORT || 6600;
const express = require("express");
const app = express();

app.use("/userdata", server);
app.use("/userpost", post);

app.listen(port, () => {
  console.log(`server start with ${port}`);
});
