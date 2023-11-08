const mongoose = require("mongoose");

let friendsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

  },
  { timestamps: true }
);

const FriendsList = mongoose.model("FriendsList", friendsSchema);
module.exports = FriendsList;
