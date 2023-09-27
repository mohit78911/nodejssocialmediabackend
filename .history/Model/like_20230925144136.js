const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  like: Boolean,
  unlike: Boolean,
  // Post: {},
});

module.exports = mongoose.model("Like", likeSchema);
