const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const likes = require("../Model/like");
const users = require("../Model/users");
const post = require("../Model/post");
const comment = require("../Model/comments");

//get_Data
router.get("/", async (req, res) => {
  const likeData = await likes
    .find()
    .populate("userId")
    .populate("postId")
    .populate("commentId");
  const likeDetails = likeData;
  if (likeDetails.length <= 0) {
    res.status(400).json({ error: "Not Found" });
    console.log("Not Found");
  }
  res.send(likeDetails);
});

//adding_Data_With_Boolean_Data
router.post("/likepost", async (req, res) => {
  let likeData = await likes.create({
    _id: new mongoose.Types.ObjectId(),
    like: req.body.like,
    unlike: req.body.unlike,
    userId: req.body.userId,
    postId: req.body.postId,
    commentId: req.body.commentId,
  });
  likeData
    .save()
    .then((result) => {
      res.status(200).json(result);
      console.log("like Data Done");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Dot liked");
    });
});

router.put("/update/:id", (req, res) => {
  likes
    .updateOne({ _id: req.params.id }, { $set: { like: req.body.like } })
    .then((result) => {
      res.status(200).json(result);
      console.log("updateSuccessfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/delete/:id", (req, res) => {
  likes
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
      console.log("Like Deleted Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Error with deleting like...");
    });
});

module.exports = router;
