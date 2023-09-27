const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  // userprofile: String,
});
 
const postSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  description
})

module.exports = mongoose.model("Users", userSchema);
