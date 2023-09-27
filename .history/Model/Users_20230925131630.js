const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require : true
  },
  email: String,
  password: String,
  // userprofile: String,
});

module.exports = mongoose.model("Users", userSchema);
