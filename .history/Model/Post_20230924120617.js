const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: String,
  Users : {
    type: mongoose.Schema.Types.objectId,
    ref :"use"
  }
});

module.exports = mongoose.model("Post", postSchema);
