const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  like: Boolean,
  unlike: Boolean,
  // Post: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Post",
  //   required: true,
  // },
});

module.exports = mongoose.model("Like", likeSchema);

// module.exportS = like;
 