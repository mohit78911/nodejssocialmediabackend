const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Users = require("../Model/users");
const secretKey = "iamdoingmyworkinnodejsandreactjs";
const jwt = require("jsonwebtoken");
const auth = require("../Middlewire/auth");
const verifyToken = require("../Middlewire/verifyToken");
const bcrypt = require("bcrypt");
const cors = require("cors");

// getUser
router.get("/user", async (req, res) => {
  Users.find()
    .then((result) => {
      const token = jwt.sign({ result }, secretKey);
      res.status(200).json(result);
      console.log("accessed");
    })
    .catch((error) => {
      console.log("NotAccessed");
    });
});

//signup
router.post("/register", async (req, res) => {
  try {
    const existinguser = await Users.findOne({
      email: req.body.email,
    });
    if (existinguser) {
      return res.send("User Already Exists");
    }
    //hashing_password
    const hashPassword = bcrypt.hashSync(req.body.password, 5);
    const result = await Users.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      dob: req.body.dob,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
      phonenumber: req.body.phonenumber,
      gender: req.body.gender,
      userprofile: req.body.userprofile,
    });

    const token = jwt.sign({ result }, secretKey);

    res.status(200).json({ userData: result, token: token });
    console.log("Data Added Successfully");
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong...");
    res.end();
    console.log("Something Wrong...");
  }
});

router.post("/login", verifyToken, async (req, res) => {
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      Users.password
    );
    const existinguser = await Users.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!existinguser) {
      return res.status(404).send("Invalid Details...");
    }

    const token = jwt.sign({ existinguser }, secretKey);
    res.status(200).json({ UserProfile_Accessed: existinguser, token: token });
    console.log("Login Successfully");
    console.log(token);
  } catch (error) {
    res.send("Something Went Wrong...");
    res.end();
    console.log("Error with Login");
  }
});

module.exports = router;
