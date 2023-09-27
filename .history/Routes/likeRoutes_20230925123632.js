const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const likes = require("../Model/like");

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

router.post("/likepost",async (req, res) => {
  let likeData = await likes.create({})
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

module.exports = router;
