const mongoose = require("mongoose");

const multerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: String,
    required: [true, "Uploaded File Must have Name"],
  },
});

const File = mongoose.model("File", multerSchema);

module.exports = File;