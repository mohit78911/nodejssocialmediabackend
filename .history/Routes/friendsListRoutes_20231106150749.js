const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Friends = require("../Model/friendsList");

router.get("/friends", async (req, res) => {
  const friendsList = await Friends.find();
  if (!friendsList) {
    res.status(404).json({ error: "FriendsList_not_Found" });
    console.log("FriendsList Not Found");
    return;
  }
  res.status(200).send(friendsList);
  console.log("FriendsList_Found");
});

router.post('/addfriends')

module.exports = router;
