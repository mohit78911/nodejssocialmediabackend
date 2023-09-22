const express = require("express");
const app = express();
const users = require("../Model/Users");

app.get("/", async (req, res) => {
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

app.post('/',async (req,res)=>{
   try{
    const existingUser = await users.findOne({
      email : req.body.email,
    })
    if(existingUser){
      return res.send('User Already Exists')
      console.log('User Already Exists')
    }
   }
   catch{

   }
})
module.exports = app;
