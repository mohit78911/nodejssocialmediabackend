const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    image: String,
    lastseen: { type: Date, default: Date.now() },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

Hope you are doing well, My name is Mohit Suthar, I joined IIH Global on 1st August and completed 3 months of my internship period on 1st November, may I know my further procedure? Do I have to continue in the future or not because there is marriage in our family so I have to take leave from 27th November to 5th December.