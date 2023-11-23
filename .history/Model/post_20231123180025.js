const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    image: String,
    lastseen: { type: Date, default: Date.now() },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },                    
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
