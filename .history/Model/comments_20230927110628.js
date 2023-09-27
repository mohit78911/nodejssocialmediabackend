const mongoose = requir("mongoose");

let commentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    comment: String,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
