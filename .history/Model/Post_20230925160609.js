const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  image: String,
  // usersId: {
  //   type: mongoose.Schema.Type.ObjectId(),
  //   ref: "Users",
  //   required: true,
  // },
});
dfa
module.exports = mongoose.model("Post", postSchema);
