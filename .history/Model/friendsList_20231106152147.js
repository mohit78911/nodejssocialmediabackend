const mongoose = require("mongoose");

let friendsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref  : ""
    },
  },
  { timestamps: true }
);

const FriendsList = mongoose.model("FriendsList", friendsSchema);
module.exports = FriendsList;
