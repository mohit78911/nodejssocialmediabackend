const mongoose = require("mongoose");

let statusSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  status: String,
  userId : {
    type : mongoose.Types.
  }
});

const Status = mongoose.model("Status", statusSchema);
module.exports = Status;
