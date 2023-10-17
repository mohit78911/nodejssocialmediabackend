const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    comment: String,
    date : ne
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
