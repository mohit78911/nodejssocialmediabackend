const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  like: Boolean,
  unlike: Boolean,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ost",
    required: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);

// module.exports = likeSchema;
