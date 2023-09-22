const express = require("express");
const app = express();
const users = require("../Model/Users");

app.get("/", async (req, res) => {
  const usersList = await users.find();
  if (!usersList) {
    res.status(500).json({ error: 'can"t fetch' });
  }
  res.send(usersList);
});

module.exports = app;
