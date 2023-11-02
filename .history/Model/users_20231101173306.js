const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    userprofile: {
      type : String,
      default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLPA7eB9XoiCtJKQ6DmxeCGMj_WGs-GeNXOA&usqp=CAU  "
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
