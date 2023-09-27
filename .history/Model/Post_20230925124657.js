const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId(),
    ref: "Users",
  },
});

module.exports = mongoose.model("Post", postSchema);
 