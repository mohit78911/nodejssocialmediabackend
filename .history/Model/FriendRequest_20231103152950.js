const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    status: {
      required: true,
    },
  },
  { timestamps: true }
);

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
module.exports = FriendRequest;
