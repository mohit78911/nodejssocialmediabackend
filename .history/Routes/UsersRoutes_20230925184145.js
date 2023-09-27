const express = require("express");
const router = express.Router();
const users = require("../Model/users");
const mongoose = require("mongoose");

//getAllData
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

//getDataFromName
router.get("/findbyname/:name", (req, res) => {
  users
    .findOne({ name: req.params.name })
    .then((result) => {
      res.status(200).json(result);
      console.log("User Found", result);
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("User Not Found");
    });
});

//getDataFromId
router.get("/findbyid/:id", (req, res) => {
  users
    .findOne({ _id: req.params.id })
    .then((result) => {
      if (users) {
        res.status(200).json(result);
        console.log("User found by id", result);
      } else {
        res.status(404).json("User Not Found");
      }
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("User Not Found...");
    });
});

//adding_User_Data
router.post("/post", async (req, res) => {
  try {
    const existingUser = await users.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      console.log("User Already Exists");
      return res.send("User Already Exists");
      res.end();
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

//deleteDataWith_Id
router.delete("/delete/:id", (req, res) => {
  users
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      if (users) {
        res.status(200).json({ message: "user Deleted Successfully" });
        console.log("user Deleted Successfully");
      } else {
        res.status(404).json({ message: "User Not Found" });
        console.log("User Not Found");
      }
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Data Can't Delete");
    });
});

//updateDataWithId
router.put("/update/:id", (req, res) => {
  users
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          password: req.body.password,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log("Updated Successfully");
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Data Can't Update...");
    });
});

module.exports = router;
