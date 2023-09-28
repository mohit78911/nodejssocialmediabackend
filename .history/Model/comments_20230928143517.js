const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    comment: {
      type: String,
      required: true,
    },
    user : {
      type : mongoose.Schema
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
