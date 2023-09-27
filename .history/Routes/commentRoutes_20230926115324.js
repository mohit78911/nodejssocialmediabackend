const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const comments = require("../Model/comments");

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

router.post("/postcomment", async (req, res) => {
  let newData = await comments.create({});
});

module.exports = router;
