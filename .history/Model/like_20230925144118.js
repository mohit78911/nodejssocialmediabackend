const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  like: true,
  unlike: Bool,
  // Post: {},
});

module.exports = mongoose.model("Like", likeSchema);
