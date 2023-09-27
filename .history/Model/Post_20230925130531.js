const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: String,
  users :   {
    type : 
  }
});

module.exports = mongoose.model("Post", postSchema);
