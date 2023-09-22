const express = require("express");
const router = express.Router
const users = require("../Model/Users");

app.get("/", async (req, res) => {
  users
    .find()
    .then((result) => {
      res.status(200).json(result);
      console.log("Data Fetch Done");
    })
    .catch((error) => {
      console.log("Data Can't Fetch");
    });
});

module.exports = UserRoutes;
