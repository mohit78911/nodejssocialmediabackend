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

router.post("/post", async (req, res) => {
  const statusData = await Status.create({
    _id: new mongoose.Types.objectId(),
    status: req.body.status,
  });
  statusData.save().then((result)=>{
    res.status(200).json(result)
    console.log("status data added")
  }).catch((error))
});

module.exports = router;
