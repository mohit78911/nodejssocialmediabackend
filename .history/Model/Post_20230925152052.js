const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  image: String,
  users : [
    {
      type : mongoose.Schema.Type.ObjectId()
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
