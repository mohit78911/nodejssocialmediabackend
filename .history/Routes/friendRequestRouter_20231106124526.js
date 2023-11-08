const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FriendRequest = require("../Model/FriendRequest");

router.get("/allrequest", async (req, res) => {
  FriendRequest.find()
    .then((result) => {
      res.status(200).json(result);
      console.log("RequestDataFetch_Done");
    })
    .catch((error) => {
      console.log(error);
    });
});

//get friendlist data
router.get("/requestlist/:receiver", async (req, res) => {
  const receiver = req.params.receiver;
  FriendRequest.find({ receiver: receiver })
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
router.put("/acceptfriendrequest/:receiver", async (req, res) => {
  try {
    const receiver = req.params.receiver;
    const sender = req.body.sender;
    const request = await FriendRequest.updateOne(
      { receiver: receiver },
      { $set: { status: req.body.status } }
    );
    res.json(request);
    console.log("requestAccepted");
  } catch (error) {
    res.status(500).json({ error: "Failed to accept friend request" });
  }
});

// reject friend request router
router.put("/rejectfriendrequest/:receiver", async (req, res) => {
  try {
    const receiver = req.params.receiver;
    const sender = req.body.sender;
    const request = await FriendRequest.updateOne(
      { receiver: receiver },
      { $set: { status: req.body.status } }
    );
    res.json(request);
    console.log("requestDecline");
    request.deleteOne({ receiver: receiver });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject friend request" });
  }
});

router.delete("deleterequest/:id", async (req, res) => {
  cons FriendRequest.deleteOne({ _id: req.params.id })
     
});

module.exports = router;
