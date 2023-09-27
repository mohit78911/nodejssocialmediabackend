const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  city: String,
  dob: String,
  pincode: Number,
  state: String,
  phonenumber: Number,
  gender: String,

  // userprofile: String,
  userId: String,
});

module.exports = mongoose.model("Users", userSchema);
