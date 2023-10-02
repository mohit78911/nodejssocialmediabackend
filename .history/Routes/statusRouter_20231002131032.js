const express = require("express")
const router = express.Router()
const Status =  require('../Model/status')

router.get(async,(req,res)=>{
    const statusData = await likes
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
})