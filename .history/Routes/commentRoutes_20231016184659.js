const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const comments = require("../Model/comments");
const users = require("../Model/users");
const post = require("../Model/post");
const joi = require("joi");
const validator = require("express-joi-validation");
const joiSchema = require("../ValidatoreSchema/commentValidate");
const verifyToken = require("../Middlewire/verifyToken");

//validation function
function validate(req) {
  const schema = {
    comment: joi.string().required(),
  };
  return validator.body(req, schema);
}

//Get_Users_Comment
router.get("/", async (req, res) => {
  const postId = req.body.postId;
  const commentData = await comments
    .find(comment : "us")
    .populate("userId")
    .populate("postId");
  const commentDetails = commentData;
  if (!commentDetails) {
    res.status(400).json({ error: "Comment Not Found" });
    console.log("CommentNotFound!");
  }
  res.send(commentDetails);
});

// //Get_Users_Comment
// router.get("/", async (req, res) => {
//   // const currentUser = req.body.postId;
//   const commentData = await comments
//     .find()
//     .populate("postId")
//     .populate("userId");
//   const commentDetails = commentData;
//   if (!commentDetails) {
//     res.status(400).json({ error: "Comment Not Found" });
//     console.log("CommentNotFound!");
//   }
//   res.send(commentDetails);
// });

//Get_Comment_By_Id
router.get("/findbyid/:id", (req, res) => {
  comments
    .findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
      console.log("Comment Find With Id");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Comment Can't Find");
    });
});

//Posting_Comments_On_Post
router.post("/postcomment", async (req, res) => {
  const { comment, userId, postId } = req.body;
  let newData = await comments.create({
    _id: new mongoose.Types.ObjectId(),
    comment,
    userId,
    postId,
  });
  newData
    .save()
    .then((result) => {
      res.status(200).json(result);
      console.log("Comment Post Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Error With Posting Comment...");
    });
});

//Update_Comment_With_Id
router.put("/update/:id", async (req, res) => {
  const { comment, userId, postId } = req.body;

  comments
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          comment,
          userId,
          postId,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log("Comment Update Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Error with Updating Comment...");
    });
});

//deleting_Comment_With_Id
router.delete("/delete/:id", (req, res) => {
  comments
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
      console.log("Comment Deleted Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Error With Deleting Comment...");
    });
});

module.exports = router;
