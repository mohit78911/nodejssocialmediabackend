const express =  require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Users = require("../Model/users")

//signup
router.post('/post',async (req,res)=>{
    
})


const signup = async (req, res) => {
    try {
      const existinguser = await userModuls.findOne({
        email: req.body.email,
        username: req.body.username,
      });
      if (existinguser) {
        return res.send("User Already Exists");
      }
  
      const result = await userModuls.create({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
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
  };