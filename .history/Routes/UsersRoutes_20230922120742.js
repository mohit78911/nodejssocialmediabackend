const express = require("express");
const app = express();
const users = require("../Model/Users");

app.get("/", async (req, res) => {
  users.find().then((result)=>{
    res.status(200).json(result)
    console.log("Data Fetch...")
  }).catch()
});

module.exports = app;
