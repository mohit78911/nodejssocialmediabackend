const express = require("express");
const router = express.Router();
const Status = require("../Model/status");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const statusData = await Status.find();
  const statusDetails = statusData;
  if (!statusDetails) {
    res.status(400).json({ error: "Not Found" });
    console.log("Not Found");
  }
  res.send(statusDetails);
});

router.post("/poststatus", async (req, res) => {
  const { status } = req.body;
  const statusData = await Status.create({
    _id: new mongoose.Types.ObjectId(),
    status,
  });

  const saveStatus = await statusData.save();
  if (!saveStatus) {
    return res.status(400).json({ error: "Data Can't Save" });
  }
  res.status(200).
  statusData
    .save()
    .then((result) => {
      res.status(200).json(result);
      console.log("status data added");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("can't post status data");
    });
});

module.exports = router;
