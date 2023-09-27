const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  image: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  comment : {
    type : mongoose.
  }
});

module.exports = mongoose.model("Post", postSchema);

// module.exports = postSchema;
