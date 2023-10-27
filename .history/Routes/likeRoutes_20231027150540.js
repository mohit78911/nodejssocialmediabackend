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

// //postnewlikedata
// router.post("/likepost", async (req, res) => {
//   const { postId, userId } = req.body;
//   try {
//     const like = new likes({
//       _id: new mongoose.Types.ObjectId(),
//       postId,
//       userId,
//     });
//     await like.save();
//     res.json({ message: "Post liked successfully" });
//     console.log("Post Liked Successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

//adding_Data_With_Boolean_Data
// router.post("/likepost/:postId", async (req, res) => { 
//   const postId = req.params.postId;
//   const userId = req.params.userId;
//   const existingUser = await likes.findOne({
//     postId: postId,
//   });
//   if (existingUser) {
//     console.log("User Already Like this post");
//     res.send("User Already Like this post");
//     res.end();
//     return;
//   }

//   let likeData = await likes.create({
//     _id: new mongoose.Types.ObjectId(),
//     like: req.body.like,
//     userId: req.body.userId,
//     postId: req.body.postId,
//   });

//   likeData
//     .save()
//     .then((result) => {
//       res.status(200).json(result);
//       console.log("like_Data_Done");
//     })
//     .catch((error) => {
//       res.send(error);
//       res.end();
//       console.log("Post_Not_Like");
//     });
// });

router.post("/likepost/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;  

  // Check if a like with the given postId and userId already exists
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

router.delete("/delete/:postId", (req, res) => {
  likes
    .deleteOne({ postId: req.params.postId })
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
