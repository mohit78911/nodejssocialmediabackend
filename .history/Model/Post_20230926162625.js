const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  image: String,
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  ],
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  ],
});
console.log("module", postSchema.userId);
module.exports = mongoose.model("Post", postSchema);

// module.exports = postSchema;
