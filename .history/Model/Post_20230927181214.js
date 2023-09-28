const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    image: String,
    user: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User",
      requir
    },
    comment: [ 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

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
    // post: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Post",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
