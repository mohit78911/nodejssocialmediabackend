const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Users = require("../Model/users");
const secretKey = "iamdoingmyworkinnodejsandreactjs";
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middlewire/verifyToken");
const bcrypt = require("bcrypt");
const joi = require("joi");
const cors = require("cors");
router.use(cors());
router.options("*", cors());

//Multer For Uploading Image's
const imgfile = require("../Model/multerdata");
const upload = require("../Middlewire/multer");
// const File = require("../Model/multerdata");

router.post("/userprofile", upload.single("img"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const user = new imgfile({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: url + "/file/",
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User registered successfully!",
        userCreated: {
          _id: result._id,
          image: result.image,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});
router.get("/", (req, res, next) => {
  imgfile.find().then((data) => {
    res.status(200).json({
      message: "User list retrieved successfully!",
      userCreated: data,
    });
  });
});
//-----

// getUser
router.get("/user", verifyToken, async (req, res) => {
  // console.log("userId", req.user.id);
  Users.findById(req.user.id)
    .then((result) => {
      res.status(200).json(result);
      console.log("accessed, Token is Verified");
    }) 
    .catch((error) => {
      console.log("NotAccessed");
      res.send(error);
      res.end();
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
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

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

    res.status(200).json({ userData: result });
    console.log("Data Added Successfully");
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong...");
    res.end();
    console.log("Something Wrong...");
  }
});

//User_login_Handler
router.post("/login", async (req, res) => {
  //validation_with_joiValidator
  const loginSchema = joi.object({
    email: joi.string().min(5).email().required(),
    password: joi.string().min(3).required(),
  });

  //loginCode_with_postMethod
  try {
    const existinguser = await Users.findOne({
      email: req.body.email,
    });

    if (!existinguser) {
      return res.status(404).send("User Not Exist");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      existinguser.password
    );

    if (existinguser) {
      if (!validPassword) {
        return res.status(404).send("Incorrect Password");
      }
      console.log(`Welcome! ${existinguser.name}`);
    }

    const { validatingLoginData } = loginSchema.validateAsync(req.body);

    if (validatingLoginData) {
      res.status(400).json({ validationError: "missingSomething..." });
      return;
    } else {
      //generating_login_token
      const token = jwt.sign(
        {
          id: existinguser._id,
          name: existinguser.name,
          email: existinguser.email,
          dob: existinguser.dob,
          city: existinguser.city,
          phonenumber: existinguser.phonenumber,
          userprofile: existinguser.userprofile,
        },
        secretKey //SecretKey
      );
      existinguser.token = token;
      console.log("Login Successfully");
      res.status(200).json({ success: "loginSuccessfulDone", token: token });
      const decode = jwt.decode(token);
      // console.log("Decoded_token : ", decode);
    }
  } catch (error) {
    res.send("Something Went Wrong...");
    res.end();
    console.log("Error with Login");
  }
});

module.exports = router;
