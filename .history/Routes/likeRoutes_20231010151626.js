const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const likes = require("../Model/like");
const users = require("../Model/users");
 
const verifyToken = require("../Middlewire/verifyToken");

//get_Data
router.get("/", async (req, res) => {
  const likeData = await likes
    .find()
    .populate("userId")
    .populate("postId")
    .populate("commentId");
  const likeDetails = likeData;
  if (likeDetails.length <= 0) {
    res.status(400).json({ error: "Not Found" });
    console.log("Not Found");
  }
  res.send(likeDetails);
});

//adding_Data_With_Boolean_Data
router.post("/likepost", async (req, res) => {
  let likeData = await likes.create({
    _id: new mongoose.Types.ObjectId(),
    like: req.body.like,
    unlike: req.body.unlike,
    userId: req.body.userId,
    postId: req.body.postId,
    commentId: req.body.commentId,
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

router.put("/update/:id", (req, res) => {
  likes
    .updateOne(
      { _id: req.params.id },
      { $set: { like: req.body.like, userId: req.body.userId } }
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
























const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mock data for posts (in-memory storage)
const posts = [];

// Routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);
  if (!post) return res.status(404).send('Post not found');
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  const index = posts.findIndex((p) => p.id === postId);
  if (index === -1) return res.status(404).send('Post not found');
  posts[index] = { ...posts[index], ...updatedPost };
  res.json(posts[index]);
});

app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const index = posts.findIndex((p) => p.id === postId);
  if (index === -1) return res.status(404).send('Post not found');
  const deletedPost = posts.splice(index, 1)[0];
  res.json(deletedPost);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});