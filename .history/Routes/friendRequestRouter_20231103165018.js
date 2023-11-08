const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FriendRequestController = require("./friendRequestController");
const FriendRequest = require("../Model/FriendRequest");

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
      console.log("Request_notSent...");
    });
});
 
//---------------------------------------------------------------------

// friendRequestRoutes.js

 

// Route to send a friend request
router.post("/sendfriendrequest", async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;
    const request = new FriendRequest({
      sender: senderId,
      recipient: recipientId,
    });
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to send friend request" });
  }
});

// Route to accept a friend request
router.post("/accept-friend-request", async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await FriendRequest.findByIdAndUpdate(requestId, {
      status: "accepted",
    });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to accept friend request" });
  }
});

// Route to reject a friend request
router.post("/reject-friend-request", async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await FriendRequest.findByIdAndUpdate(requestId, {
      status: "rejected",
    });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to reject friend request" });
  }
});

module.exports = router;

module.exports = router;
