const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FriendRequest = require("../Model/FriendRequest");

//All_Friend_Rrequst Geting Handler
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

//get request_particular_user Handler
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

//sending Friend_Request Handler
router.post("/sendrequest", async (req, res) => {
  const { sender, receiver } = req.body;

  const existingRequest = FriendRequest.find({ sender, receiver });
  if (existingRequest) {
    res.status(404).json({ error: "Request Already sent" });
    console.log("FriendRequst Already Sent");
    return;
  }

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
      console.log("Failed to send a FriendmRequest...");
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

//deleting_Handler
router.delete("/deleterequest/:id", async (req, res) => {
  const deleteData = await FriendRequest.deleteOne({ _id: req.params.id });

  if (!deleteData) {
    res.status(404).send("error with deletingData");
    return;
  }
  res.status(200).json(deleteData);
  console.log("data Deleted_Successfully");
});

module.exports = router;
