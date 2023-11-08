const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FriendRequestController = require("./friendRequestController");
const FriendRequest = require("../Model/FriendRequest");

//get friendlist data
router.get("/requestlist", async (req, res) => {
  FriendRequest.find()
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
router.post("/acceptfriendrequest", async (req, res) => {
  try {
    const receiver = req.params.receiverId;
    const request = await FriendRequest.updateOne({i})
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to accept friend request" });
  }
});

// reject friend request router
router.post("/rejectfriendrequest", async (req, res) => {
  try {
    const { receiverId } = req.body;
    const request = await FriendRequest.findByIdAndUpdate(receiverId, {
      status: "rejected",
    });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to reject friend request" });
  }
});

module.exports = router;
