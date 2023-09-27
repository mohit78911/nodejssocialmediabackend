const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  comment: String,
  users : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Comment
  }
});

module.exports = mongoose.model("Comment", commentSchema);
