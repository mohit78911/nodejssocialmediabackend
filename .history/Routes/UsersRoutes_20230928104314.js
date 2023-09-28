const express = require("express");
const router = express.Router();
const users = require("../Model/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "hellothisismohitkumarsuthar";

//get_All_Data
router.get("/", async (req, res) => {
  const  await users.find();
  const usersDetails = 
  const token = jwt.sign({ users }, SECRET_KEY);
  if (!users) {
    res.status(404).send({ message: "Invalid Details" });
    console.log("Invalid Details");
  }
  res.status(200).json(users);
});

//get_Data_From_Name
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

//get_Data_From_Id
router.get("/findbyid/:id", (req, res) => {
  users
    .findById({ _id: req.params.id })
    .then((result) => {
      if (users) {
        res.status(200).json(result.data);
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
      password: bcrypt.hashSync(req.body.password, 5),
      dob: req.body.dob,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
      phonenumber: req.body.phonenumber,
      gender: req.body.gender,
      // userprofile: req.body.userprofile,
      // post: req.body.post,
      // post: {
      //   _id: new mongoose.Types.ObjectId(),
      //   description: req.body.description,
      //   image: req.body.image,
      // },
    });

    const token = jwt.sign({ newdata }, SECRET_KEY);

    res.status(200).json({ user: newdata, token: token });
    console.log("data added");
  } catch (error) {
    res.send("data not Added...");
    res.end();
    console.log("data not added");
  }
});

//delete_Data_With_Id
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

//update_Data_With_Id
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
