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
  const { status, userId } = req.body;
  const statusData = await Status.create({
    _id: new mongoose.Types.ObjectId(),
    status,
    userId,
  });

  const saveStatus = await statusData.save();
  if (!saveStatus) {
    return res.status(400).json({ error: "Data Can't Save" });
  }
  res.status(200).send(saveStatus);
});

//update_status_handler
router.put("/update/:id", async (req, res) => {
  const { status, userId } = req.body;
  const updatedStatus = await Status.updateOne(
    { _id: req.params.id },
    { $set: { status, userId } }
  );
  const saveUpdatedStatus = await updatedStatus.save();
  if (!saveUpdatedStatus) {
    return res.status(400).json({ error: "UpdatedStatus Can't Save" });
  }
  res.status(200).send(saveUpdatedStatus);
});

//deleting_status_by_ID
router.

module.exports = router;