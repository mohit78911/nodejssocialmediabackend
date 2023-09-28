const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    like: Boolean,
    unlike: Boolean,
    userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    postId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Post"
    },
    commentId : {
      type : mongoose.Typ
    }
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
