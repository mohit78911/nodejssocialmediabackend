const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const comments = require("../Model/comments");
const joi = require("joi");
const validator = require("express-joi-validation");
const joiSchema = require("./ValidatoreSchema/commentValidate");

//validation function
function validate(req) {
  const schema = {
    comment: joi.string().required(),
  };
  return validator.body(req, schema);
}

//Get_Users_Comment
router.get("/", (req, res) => {
  comments
    .find()
    .then((result) => {
      res.status(200).json(result);
      console.log("Comments Fetch Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Comment Can't Fetch...");
    });
});

//Posting_Comments_On_Post
router.post(
  "/postcomment",
  validator.body(joiSchema.commentSchema),
  async (req, res) => {
    let newData = await comments.create({
      _id: new mongoose.Types.ObjectId(),
      comment: req.body.comment,
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
  }
);

//Update_Comment_With_Id
router.put("/update/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const comment = await comment.findByIdAndUpdate(
    { _id: params.id },
    { comment: req.body.comment }
    
  );
  if(!comment){
    return res.status(404).send()
}
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
