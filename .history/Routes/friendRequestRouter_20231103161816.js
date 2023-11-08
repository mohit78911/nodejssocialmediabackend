const express = require("express");
const router = express.Router();
const FriendRequestController = require("./friendRequestController");

router.get('/requestlist',async(req,res)=>{
    FriendRequestController.find().then((result)=>{
        res.status(200).json()
    })
})


router.get("/friendrequestlist", async (req, res) => {
  FriendRequestController.find()
    .then((result) => {
      res.status(200).json(result);
      console.log("FriendRequestList_Found");
    })
    .catch((error) => {
      console.log(error);
    });
});

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
