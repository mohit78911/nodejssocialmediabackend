const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mohit:mohit@cluster0.au0wghs.mongodb.net/mohitdata?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
