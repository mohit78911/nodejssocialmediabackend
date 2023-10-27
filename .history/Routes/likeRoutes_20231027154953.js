const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const likes = require("../Model/like");
const users = require("../Model/users");

//get_Data
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const likeData = await likes
    .find({ postId: postId })
    .populate("userId")
    .populate("postId");
  const likeDetails = likeData;
  if (!likeDetails) {
    res.status(400).json({ error: "Not_Found" });
    console.log("Not_Found");
  }
  res.send(likeDetails);
});

// /get_Data
router.get("/alllikesdata", async (req, res) => {
  const likeData = await likes.find().populate("userId").populate("postId");
  const likeDetails = likeData;
  if (!likeDetails) {
    res.status(400).json({ error: "Likes_Not_Found" });
    console.log("Not Found");
  }
  res.send(likeDetails);
});

router.post("/likepost/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;

  const existingLike = await likes.findOne({
    postId: postId,
    userId: userId,
  });

  if (existingLike) {
    console.log("User Already Like this post");
    res.status(400).json({ error: "User Already Like this post" });
    return;
  }

  let likeData = new likes({
    _id: new mongoose.Types.ObjectId(),
    like: req.body.like,
    userId: userId,
    postId: postId,
  });

  likeData
    .save()
    .then((result) => {
      res.status(200).json(result);
      console.log("like_Data_Done");
    })
    .catch((error) => {
      res.status(500).json({ error: "Post_Not_Like" });
      console.log("Post_Not_Like");
    });
});

router.put("/update/:postId", (req, res) => {
  likes
    .updateOne(
      { postId: req.params.postId },
      {
        $set: {
          like: req.body.like,
          userId: req.body.userId,
          postId: req.body.postId,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log("update_Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("can't update Like");
    });
});

router.delete("/delete/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;

  const existingLikesData = await likes.findOne({
    PostId: postId,
    userId: userId,
  });

  if (existingLikesData) {
    likes
      .deleteOne({ postId: postId, userId: userId })
      .then((result) => {
        res.status(200).json(result);
        console.log("Like Deleted Successfully");
      })
      .catch((error) => {
        res.send(error);
        res.end();
        console.log("Error with deleting like...");
      });
  } else {
    console.log("Data Can't Found");
    res.status(400).send("Data Can't Found");
  }
});

module.exports = router;
