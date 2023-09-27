const express = require("express");
const router = express.Router();
const users = require("../Model/users");

router.get("/users", async (req, res) => {
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
      userprofile: req.body.userprofile,
    });
    res.status(200).json({ user: newdata });
    console.log("data added");
  } catch (error) {
    res.send('data can"t Added...');
    res.end();
    console.log('data can"t added');
  }
});
module.exports = router;
