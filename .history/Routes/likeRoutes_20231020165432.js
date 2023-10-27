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
    res.status(400).json({ error: "Not Found" });
    console.log("Not Found");
  }
  res.send(likeDetails);
});

// /get_Data
// router.get("/", async (req, res) => {
//   const likeData = await likes.find().populate("userId").populate("postId");
//   const likeDetails = likeData;
//   if (likeDetails.length <= 0) {
//     res.status(400).json({ error: "Not Found" });
//     console.log("Not Found");
//   }
//   res.send(likeDetails);
// });

//adding_Data_With_Boolean_Data
router.post("/likepost", async (req, res) => {
  const { like, userId, postId } = req.body;
  // const userId = userId;
  const existingLike = await likes.find({ postId: userId });
  if (existingLike) {
    console.log("This User Already Like this Post!");
    return res.send("This User Already Like this post!");
  }

  let likeData = await likes.create({
    _id: new mongoose.Types.ObjectId(),
    like,
    userId,
    postId,
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
      console.log("Not like");
    });
});

router.put("/update/:id", (req, res) => {
  likes
    .updateOne(
      { _id: req.params.id },
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
      console.log("updateSuccessfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("can't update Like");
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
