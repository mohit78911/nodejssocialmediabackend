const express = require("express");
const router = express.Router();
const users = require("../Model/users");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  users
    .find()
    .then((result) => {
      res.status(200).json(result);
      console.log("Data Fetch...");
    })
    .catch((error) => {
      console.log("Data Can't fetch...");
    });
});

router.post("/post", async (req, res) => {
  try {
    const existingUser = await users.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.send("User Already Exists");
      console.log("User Already Exists");
    }

    let newdata = await users.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // userprofile: req.body.userprofile,
    });
    res.status(200).json({ user: newdata });
    console.log("data added");
  } catch (error) {
    res.send("data not Added...");
    res.end();
    console.log("data not added");
  }
});

router.delete("/delete/:id", async (req, res) => {
  const deleteUser = await users.deleteOne({ _id: req.params.id });

  if (!deleteUser) {
    res.status(500).json({ user: "deleted" });
    res.s
  }
  res.status(200).json(users);

  // .then((result) => {
  //   res.status(200).json(result);
  //   console.log("Deleted Successfully");
  // })
  // .catch((error) => {
  //   res.send(error);
  //   res.end();
  //   console.log("Data Can't Delete");
  // });
});

router.put("/update/:id", (req, res) => {});
module.exports = router;
