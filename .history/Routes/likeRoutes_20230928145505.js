const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const likes = require("../Model/like");

//get_Data
router.get("/", (req, res) => {
  likes
    .find()
    .then((result) => {
      res.status(200).json(result);
      console.log("likes fetched");
    })
    .catch((error) => {
      console.log("likes can't fetch");
      res.send(error);
      res.end();
    });
});

//adding_Data_With_Boolean_Data
router.post("/likepost", async (req, res) => {
  let likeData = await likes.create({
    _id: new mongoose.Types.ObjectId(),
    like: req.body.like,
    unlike: req.body.unlike,
    userId : req.body.userId
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