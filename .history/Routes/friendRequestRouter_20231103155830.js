const express = require("express");
const router = express.Router();
const friendRequestController = require("./friendRequestController");

router.get('/friendrequestlist',async(req,res)=>{
    const request = await friendRequestController.find()
    if(request){
        res.status(404).json({error : "Friend_request_list_not Found"})
    }
})

router.post("/friendrequest", async (req, res) => {
  const { sendId, receiverId } = req.body;

  try {
    const request = await friendRequestController.sendFriendRequest({
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
