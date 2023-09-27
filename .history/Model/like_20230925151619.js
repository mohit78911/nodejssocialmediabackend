const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  like: Boolean,
  unlike: Boolean,
  Post: {
    type : mongoose.Schema.Types.ObjectId(),
    ref : 'post'
  },
});

module.exports = mongoose.model("Like", likeSchema);
