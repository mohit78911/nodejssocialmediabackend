const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    lastseen: { type: Date , default: Date.no},
    dob: String,
    city: String,
    pincode: Number,
    state: String,
    phonenumber: Number,
    gender: String,
    userprofile: String,
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
