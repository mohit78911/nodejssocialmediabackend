const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
},{});

