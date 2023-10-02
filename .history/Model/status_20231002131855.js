const mongoose = require("mongoose");

let statusSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    status: String,
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);
module.exports = Status;
 