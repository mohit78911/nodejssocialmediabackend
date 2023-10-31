const likes = require("../Model/like")
const express = require("express")
const router = express.Router()


router.get('/likes',async(req,res)=>{
    const likeData = await likes.find()
    if(!likeData){
        res.status(400).json(error : "likeData can't Fetch")
    }
    res.send()
})