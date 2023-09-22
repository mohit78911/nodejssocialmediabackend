const express = require("express");
const router = express.Router()
const users = require("../Model/Users");

router.get("/", async (req, res) => {
    const usersList = await users.find()
    if(!usersList){
        res.status(400)
    }
});

module.exports = router;
