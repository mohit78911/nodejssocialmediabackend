const express = require("express");
const router = express.Router();
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

router.post('/sendrequest',async(req,res)=>{
    FriendRequest.
})

router.post("/friendrequest", async (req, res) => {
  const { sendId, receiverId } = req.body;

  try {
    const request = await FriendRequestController.sendFriendRequest({
      sendId,
      receiverId,
    });
    res.status(200).json(request);
    console.log("Request_Send_Successfully");
  } catch (error) {
    res.status(500).json({ error: "Friend_Request_can't_Send" });
  }
});

module.exports = router;
