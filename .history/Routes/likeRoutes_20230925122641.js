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

router.post('/likepost',(req,res)=>{
    let likeData = {
        _id : mongoose
        like : req.body.like
    }
})

module.exports = router;
