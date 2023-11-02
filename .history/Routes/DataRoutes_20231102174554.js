const likes = require("../Model/like");
const express = require("express");
const router = express.Router();

router.get("/likes", async (req, res) => {
  const likeData = await likes.find().populate("userId").populate("postId");
  if (!likeData) {
    res.status(400).json({ error: "likeData can't Fetch" });
    console.log("likeData can't fetch");
  }
  res.send(likeData);
  console.log("Likes_Fetched");
});

const Comments = require("../Model/comments");
router.get("/allcomments", (req, res) => {
  Comments.find().populate("userId")
    .then((result) => {
      res.status(200).json(result);
      console.log("comments_Fetched");
    })
    .catch((error) => {
      console.log("Comment_Can't_Fetched", error);
    });
});

module.exports = router;
