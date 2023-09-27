




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  dob: String,
  city: String,
  pincode: Number,
  state: String,
  phonenumber: Number,
  gender: String,
});
 

console.log('userSchema' ,userSchema)
module.exports = mongoose.model("Users", userSchema);
// module.exports = userSchema;
