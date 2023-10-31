const express = require("express");
const router = express.Router();
const posts = require("../Model/post");
const users = require("../Model/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "hellothisismohitkumarsuthar";

//get_All_Data
router.get("/", async (req, res) => {
  const usersPost = await posts.find().populate("userId");
  const postDetails = usersPost;

  if (usersPost.length <= 0) {
    res.status(404).json({ massage: "Invalid POST" });
    console.log("Invalid POST");
  }
  res.send(postDetails);
});

//adding_post_Data
router.post("/postuser", async (req, res) => {
  const { description, image, userId } = req.body;

  if (!description || !image) {
    res.status(400).json({ result: "Invalid Details" });
    console.log("Invalid Details");
  }
  let newData = await posts.create({
    _id: new mongoose.Types.ObjectId(),
    description,
    image,
    userId,
  }); 
  const newPostData = await newData.save();
  if (!newPostData) {
    return res.status(400).json({ error: "DATA NOT FOUND" });
  }
  res.status(200).send(newData);
});

//Get_Post_By_Id
router.get("/findbyid/:id", (req, res) => {
  posts
    .findById({ _id: req.params.id })
    .then((result) => {
      if (!result) {
        res.status(404).json({ massage: "Post Not Found" });
        console.log("Post Not Found!");
      }
      res.status(200).json({ postById: result });
    })
    .catch((error) => {
      res.send({ error: "Invalid Post ID" });
      res.end();
      console.log("Invalid Post ID");
    });
});

//deleting_Data_with_id
router.delete("/delete/:id", (req, res) => {
  posts
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
      console.log("delete Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log('data can"t Delete...');
    });
});

//updating_Data_With_Id
router.put("/update/:id", (req, res) => {
  const { description, image, userId } = req.body;
  posts
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          description,
          image,
          userId,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log("Data Updated Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Data can't Updated");
    });
});

module.exports = router;
