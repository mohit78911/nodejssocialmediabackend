const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    like: {
      type: Number,
      default: 0,
    },
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
