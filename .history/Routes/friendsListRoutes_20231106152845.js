const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Friends = require("../Model/friendsList");

router.get("/friends", async (req, res) => {
  const friendsList = await Friends.find().populate("user");
  if (!friendsList) {
    res.status(404).json({ error: "FriendsList_not_Found" });
    console.log("FriendsList Not Found");
    return;
  }
  res.status(200).send(friendsList);
  console.log("FriendsList_Found");
});

router.post("/addfriend", async (req, res) => {
  const { userId, postId } = req.body;
  const existingUser = await Friends.findOne({ userId: userId });
  if (existingUser) {
    res.status(200).send("You both are already friends");
    console.log("You both are already  friends");
    return;
  }
  const newFriends = await Friends.create({
    _id: new mongoose.Types.ObjectId(),
    userId,
    postId,
  });
  newFriends
    .save()
    .then((result) => {
      res.status(200).json(result);
      console.log("New Friend Added.");
    })
    .catch((error) => {
      console.log("friend Not Added", error);
    });
});


router.delete("/delete/:id",async(req,res)=>{
    Friends.deleteOne({_id : req.params.id}).then((result)=>{
        res.status(200).json(result)
        console.log("Friend Remove Done.")
    }).catch((error)=>{
        console.log("Friend ")
    })
})

module.exports = router;
