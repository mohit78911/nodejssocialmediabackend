const mongoose = require("mongoose");

let statusSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  status: String,
});

const Status = mongoose.("Status", statusSchema);
module.exports = Status;
