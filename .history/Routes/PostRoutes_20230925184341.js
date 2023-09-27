const express = require("express");
const router = express.Router();
const posts = require("../Model/post");
const mongoose = require("mongoose");

//get_All_Data
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

//adding_Post_Data
router.post("/post", async (req, res) => {
  const newData = await posts.create({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    image: req.body.image,
    Users: req.body.Users, 
  }); 
  newData
    .save()
    .then((result) => {
      res.status(200).json(result);
      console.log("post Data Added");
    })
    .catch((error) => {
      res.send("post data can't added");
      res.end();
      console.log('post data can"t added');
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
module.exports = router;
