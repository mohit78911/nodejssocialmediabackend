const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const comments = require("../Model/comments");

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
router.post("/postcomment", async (req, res) => {
  let newData = await comments.create({
    _id: mongoose.Schema.Types.ObjectId(),
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
});

//Update_Comment_With_Id
router.put('/update/:id',(req,res)=>{
    comments.updateOne({_id:req.params.id},{})
})

module.exports = router;
