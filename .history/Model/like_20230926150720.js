const mongoose = require("mongoose");




const likeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  like: Boolean,
  unlike: Boolean,
  post :{
    type : 
  }
});

module.exports = mongoose.model("Like", likeSchema);

// module.exports = likeSchema;
 