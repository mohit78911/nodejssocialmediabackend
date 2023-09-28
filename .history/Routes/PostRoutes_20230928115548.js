const express = require("express");
const router = express.Router();
const posts = require("../Model/post");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "hellothisismohitkumarsuthar";

//get_All_Data
router.get("/", async (req, res) => {
  const usersPost = await posts.find();
  const postDetails = usersPost;

  if (!posts) {
    res.status(404).json({ massage: "Invalid POST" });
    console.log("Invalid POST");
  }
  res.send({ result: postDetails });
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

//adding_Post_Data
router.post("/post", async (req, res) => {
  const newData = await posts.create({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    image: req.body.image,
    user: [
      {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        city: req.body.city,
        pincode: req.body.pincode,   
        state: req.body.state,
        phonenumber: req.body.phonenumber,
        gender: req.body.gender,
      },
    ],
    comment: [
      {
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
      },
    ],
  });

  //jwt_token
  const token = jwt.sign({ newData }, SECRET_KEY);
  newData
    .save()
    .then((result) => {
      res.status(200).json({ post_User: result, token: token });
      console.log("Post Data Added");
      console.log("userData", newData.user._id);
    })
    .catch((error) => {
      res.send("Post Data Can't Added");
      res.end();
      console.log('Post Data Can"t Added');
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
  posts
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          description: req.body.description,
          image: req.body.image,
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

router.post("/postuser", async (req, res) => {
  const { description, image } = req.body;

  if (!description || !image) {
    res.status(400).json({ result: "Invalid Details" });
    console.log("Invalid Details");
  }
  let newData = await posts.create({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    image: req.body.image,
    user: req.body.user,
  });
  newData = await newData.save();
  if (!newData) {
    return res.status(400).json({ error: "Don't have Data" });
  }
  res.status(200).send(newData);
});

module.exports = router;
