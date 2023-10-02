const express = require("express");
const router = express.Router();
const Status = require("../Model/status");

router.get("/", async (req, res) => {
  const statusData = await Status.find();
  const statusDetails = statusData;
  if (statusDetails.length <= 0) {
    res.status(400).json({ error: "Not Found" });
    console.log("Not Found");
  }
  res.send(statusDetails);
});

router.post('/post',async(req,res))

module.exports = router;
