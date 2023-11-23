const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FriendRequest = require("../Model/FriendRequest");
const verifyToken = require("../Middlewire/verifyToken");
const Friends = require("../Model/friendsList")

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
router.get("/requestlist/:receiver", verifyToken, async (req, res) => {
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
router.post("/sendrequest", verifyToken, async (req, res) => {
  const { sender, receiver } = req.body;

  //checking friendlist if already user have in this
  const existingRequest = await FriendRequest.findOne({ sender, receiver });
  if (existingRequest) {
    res.status(404).json({ message: "Request Already sent" });
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
      console.log("Failed to send a FriendRequest...");
    });
});

// accept friend request router
router.put("/acceptfriendrequest/:receiver", async (req, res) => {
  try {
    const receiver = req.params.receiver;
    const sender = req.body.sender;
    const request = await FriendRequest.updateOne(
      { receiver: receiver },
      { $set: { status: "accepted" } }
    );
    res.json(request);
    console.log("requestAccepted");
  } catch (error) {
    res.status(500).json({ message: "Failed to accept friend request" });
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
    res.status(500).json({ message: "Failed to reject friend request" });
  }
});

//deleting_Handler
router.delete("/deleterequest/:receiver", verifyToken, async (req, res) => {
  const deleteData = await FriendRequest.deleteOne({
    receiver: req.params.receiver,
  });

  if (!deleteData) {
    res.status(404).send("error with deletingData");
    return;
  }
  res.status(200).json(deleteData);
  console.log("data Deleted_Successfully");
});

//other one function
router.put("/friendrequest/:receiver", verifyToken, async (req, res) => {
  try {
    const receiver = req.params.receiver;
    const sender = req.body.sender;
    const action = req.body.action;

    let newStatus;
    console.log("action", action);
    if (action === "accept") {
      newStatus = "accepted";
    } else if (action === "reject") {
      newStatus = "rejected";
    } else {
      res.status(400).json({ error: "Invalid action" });
      console.log("Invalid Action");
      return;
    }
    console.log("action", action);
    const request = await FriendRequest.updateOne(
      { receiver: receiver },
      { $set: { status: newStatus } }
    );

    if (!request) {
      res.status(404).json({ message: "Friend Request Status can't Update." });
      console.log("Error with Updating friend_Request Status.");
      return;
    }

    res.json(request);
    console.log(`Friend request ${action}ed`);
  } catch (error) {
    res.status(500).json({ error: "Friend Request failed..." });
  }
});

//accept delete handler



router.delete(
  "/requestacceptandadd/:receiver",
  verifyToken,
  async (req, res) => {
    try {
      const receiver = req.params.receiver;
     
      const existingRequest = await FriendRequest.findOne({ receiver: receiver });
      
      if (!existingRequest) {
        res.status(400).json({ error: "Request not found." });
        console.log("Request not found.");
        return;
      }
      
      const { userId, friendId } = req.body;

      await FriendRequest.deleteOne({ _id: existingRequest._id });

      const newFriend = await Friends.create({
        userId: userId,
        friendId: friendId,
      });
      
      newFriend.save()
        .then((result) => {
          res.status(200).json(result);
          console.log("New Friend Added Successfully");
        })
        .catch((error) => {
          res.status(500).json({ error: "New Friend Not Added." });
        });
    } catch (error) {
      res.status(400).json({ error: "Invalid Request" });
    }
  }
);


module.exports = router;
