const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    like: Boolean,
    likeuser : String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
