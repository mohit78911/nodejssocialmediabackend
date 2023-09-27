const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  like: Number,
  unlike: Number--,
  // Post: {},
});

module.exports = mongoose.model("Like", likeSchema);
