const mongoose = require("mongoose");

let friendsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref  : "Post"
    },
  },
  { timestamps: true }
);

const FriendsList = mongoose.model("FriendsList", friendsSchema);
module.exports = FriendsList;
