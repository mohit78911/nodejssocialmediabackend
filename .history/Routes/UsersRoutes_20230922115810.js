const express = require("express");
const app = express();
const users = require("../Model/Users");

router.get("/", async (req, res) => {
  const usersList = await users.find();
  if (!usersList) {
    res.status(500).json(console.log('Data Can"t Fetch...'));
  }
  res.send(usersList);
});

module.exports = router;
