const express = require("express");
const router = express.Router();
const posts = require("../Model/post");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  posts
    .find()
    .then((result) => {
      res.status(200).json(result);
      console.log("post find successfully");
    })
    .catch((error) => {
      console.log('post can"t fetch...');
    });
});

router.post("/post", async (req, res) => {
  const newData = await posts.create({
    _id: new mongoose.Types.ObjectId(),
    image: req.body.image,
    // Users: req.body.Users,
  })
  newData.save().then((result)=>{
    res.status(200).json(result)
    console.log('post Data Saved')
  })
});

module.exports = router;
