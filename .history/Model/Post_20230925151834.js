const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  image: String,
  // users: {
    type: mongoose.Schema.Types.ObjectId(),
    ref: "Users",
  },
});

module.exports = mongoose.model("Post", postSchema);
