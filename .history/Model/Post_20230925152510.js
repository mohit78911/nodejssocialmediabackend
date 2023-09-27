const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  image: String,
  users: {
    type: new mongoose.Schema.Type.ObjectId(),
    refPath: "Users",
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
