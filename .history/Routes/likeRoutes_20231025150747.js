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
router.get("/alllikesdata", async (req, res) => {
  const likeData = await likes.find().populate("userId").populate("postId");
  const likeDetails = likeData;
  if (!likeDetails) {
    res.status(400).json({ error: "Not Found" });
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
router.post("/likepost", async (req, res) => {
  const { like, userId, postId } = req.body;
  const _id = req.body.id;
  // const userId = userId;
  const existingLike = await likes.find({ postId: req.body.postId });
  if (existingLike) {
    console.log("User Already Like this {Post}!");
    res.send("This User Already Like this post!");
    return;
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

//like_update_function
// router.put("/update/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const like = await likes.findById(_id);
//     if (!like) {
//       return res.status(404).json({ message: "Like not found" });
//     }
//     res.json({ message: "Like removed successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// });

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
