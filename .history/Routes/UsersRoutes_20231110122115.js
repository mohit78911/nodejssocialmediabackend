const express = require("express");
const router = express.Router();
const users = require("../Model/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "hellothisismohitkumarsuthar";
const joi = require("joi");

//registrationSchema_with_JOI
const registrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  lastseen: joi.string(),
  dob: joi.number().required(),
  city: joi.string().required(),
  pincode: joi.number(),
  state: joi.string().required(),
  phonenumber: joi.number(),
  gender: joi.string().required(),
  userprofile: joi.string(),
});

//get_All_Data
router.get("/", async (req, res) => {
  const allUsers = await users.find();
  const usersDetails = allUsers;

  if (!users) {
    res.status(404).send({ message: "Invalid Details" });
    console.log("Invalid Details");
  }
  res.send(usersDetails);
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
      if (!users) {
        res.status(404).json({ message: "User Is Not Valid" });
        console.log("User Is Not Valid");
      } else {
        res.status(200).json(result); 
      }
    })
    .catch((error) => {
      res.send({ massage: "Invalid ID" });
      res.end();
      console.log("Invalid ID");
    });
});

//adding_User_Data
router.post("/register", async (req, res) => {
  try {
    const existingUser = await users.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      console.log("User Already Exists");
      return res.send("User Already Exists");
      res.end();
    }
    //hasingPassword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let newdata = await users.create({
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

    const token = jwt.sign({ newdata }, SECRET_KEY);

    const { error } = registrationSchema.validateAsync(req.body);

    if (error) {
      res.status(400).json({ validationError: "REQUIRED INPUT FIELD" });
      console.log("Missing Some Data In Input Field");
      return;
    } else {
      res.status(200).json({ user: newdata, token: token });
      console.log("data added");
    }
  } catch (error) {
    res.send("data not Added...");
    res.end();
    console.log("data not added");
  }
});

//delete_Data_With_Id
router.delete("/delete/:id", (req, res) => {
  const usersData =  users
    .deleteOne({ _id: req.params.id })
     try{
      if (!usersData) {
        res.status(204).json({ message: "user Not Found " });
        console.log("user Not Found");
      
     }
      
     
    .catch((error) => {
      res.send(error);
      res.end();
      console.log("Data Can't Delete");
    });
});

//update_Data_With_Id
router.put("/update/:id", async (req, res) => {
  users
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          password: req.body.password,
          lastseen: req.body.lastseen,
          dob: req.body.dob,
          city: req.body.city,
          pincode: req.body.pincode,
          state: req.body.state,
          phonenumber: req.body.phonenumber,
          gender: req.body.gender,
          userprofile: req.body.userprofile,
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
