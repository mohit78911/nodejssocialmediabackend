const likes = require("../Model/like")
const express = require("express")
const router = express.Router()


router.get('/likes',async(req,res)=>{
    const likeData = await likes.find().populate("userId").populate("")
    if(!likeData){
        res.status(400).json({error : "likeData can't Fetch"})
        console.log("likeData can't fetch")
    }
    res.send(likeData)
})