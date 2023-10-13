const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    image: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    ommentId: {
      type: mongoose.Schema.Types.ObjectId,
      cref: "Comment",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
