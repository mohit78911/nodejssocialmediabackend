const mongoose = require("mongoose");

const multerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", multerSchema);

module.exports = File;
