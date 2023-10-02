const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Users = require("../Model/users");
const secretKey = "iamdoingmyworkinnodejsandreactjs";
const jwt = require("jsonwebtoken");
const auth = require("../Middlewire/auth");
const bcrypt = require("bcrypt");

//getUser
router.get('/user',async(req,))

//signup
router.post("/post", async (req, res) => {
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
    const token = jwt.sign({ email: result.email, id: result._id }, secretKey);

    res.status(200).json({ userData: result, token: token });
    console.log("Data Added Successfully");
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong...");
    res.end();
    console.log("Something Wrong...");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const existinguser = await Users.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!existinguser) {
      return res.send("Invalid Details...");
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      secretKey
    );

    res.status(201).json({ UserProfile_Accessed: existinguser, token: token });
    console.log("Login Successfully");
  } catch (error) {
    res.send("Something Went Wrong...");
    res.end();
    console.log("Error with Login");
  }
});

module.exports = router;
