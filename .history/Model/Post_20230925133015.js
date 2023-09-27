const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: String,
  // users: {
  //   type: mongoose.Schema.Types.ObjectId(),
  //   ref: "Users",
  //   required: true,
  // },
});

module.exports = mongoose.model("Post", postSchema);
