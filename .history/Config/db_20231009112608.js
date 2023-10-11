const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.au0wghs.mongodb.net/demo?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((x) => {
    console.log(`Server Connected with Database ${x.}`);
  })
  .catch(() => {
    console.log("Not Connected with Database");
  });
