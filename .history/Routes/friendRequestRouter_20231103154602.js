const express = require("express");
const router = express.Router();
const friendRequestController = require('./friendRequestController')


router.post("/sendfriendrequest", async (req, res) => {
  const { sendId, receiverId } = req.body;

  try{
    const request = await friendReq
  }
});
