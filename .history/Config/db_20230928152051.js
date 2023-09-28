const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mohit:mohit@cluster0.au0wghs.mongodb.net/demo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
