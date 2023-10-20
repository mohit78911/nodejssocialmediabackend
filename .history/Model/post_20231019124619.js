const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    image: String,
    lastseen: { type: Date, default: T},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    // commentId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Comment",
    // },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
