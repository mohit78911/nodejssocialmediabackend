const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FriendRequestController = require("./friendRequestController");
const FriendRequest = require("../Model/FriendRequest");

//get friendlist data
router.get("/requestlist", async (req, res) => {
    const receiver = req.params.receiver
  FriendRequest.find({receiver :})
    .populate("sender")
    .populate("receiver")
    .then((result) => {
      res.status(200).json(result);
      console.log("RequestList_Found");
    }) 
    .catch((error) => {
      console.log("RequestList_NotFound!");
    });
});

//send friend request
router.post("/sendrequest", async (req, res) => {
  const { sender, receiver } = req.body;
  const request = await FriendRequest.create({
    _id: new mongoose.Types.ObjectId(),
    sender,
    receiver,
  });

  request
    .save()
    .then((result) => {
      res.status(200).json(result);
      console.log("RequestSend_Done");
    })
    .catch((error) => {
      console.log(error);
      console.log("Failed to send a Friend Request...");
    });
});

// accept friend request router
router.post("/acceptfriendrequest/:sender", async (req, res) => {
  try {
    const receiver = req.body.receiverId;
    const sender = req.params.sender;
    const request = await FriendRequest.updateOne(
      { receiver: receiver, sender: sender },
      { $set: { status: "accepted" } }
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to accept friend request" });
  }
});

// reject friend request router
router.post("/rejectfriendrequest/:sender", async (req, res) => {
  try {
    const receiver = req.body.receiverId;
    const sender = req.params.sender;
    const request = await FriendRequest.updateOne(
      { receiver: receiver, sender: sender },
      { $set: { status: "rejected" } }
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to reject friend request" });
  }
});

module.exports = router;
