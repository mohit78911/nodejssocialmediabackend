const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  image: String,
  // usersId: {
  //   type: mongoose.Schema.Type.ObjectId(),
  //   refPath: "Users",
  //   required: true,
  // },
});

module.exports = mongoose.model("Post", postSchema);
