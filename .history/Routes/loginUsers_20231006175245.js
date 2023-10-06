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
const File = require("../Model/multerdata");
const multer = require("multer");
const upload = multer({ desk: "files/" });

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

const uploadImg = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//multer
router.post("/userprofile", upload.single("myFile"), async (req, res) => {
  console.log(res.file);
});

// getUser
router.get("/user", verifyToken, async (req, res) => {
  console.log("userId", req.user.id);
  Users.findById(req.user.id)
    .then((result) => {
      res.status(200).json(result);
      console.log("accessed");
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

    const token = jwt.sign(
      {
        id: result._id,
        name: result.name,
        email: result.email,
        dob: result.dob,
        city: result.city,
      },
      secretKey
    );
    result.token = token;

    res.status(200).json({ userData: result, token: token });
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
  const loginSchema = joi.object({
    email: joi.string().min(5).email().required(),
    password: joi.string().min(3).required(),
  });

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
      console.log("missingSomething");
      return;
    } else {
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
        secretKey
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
