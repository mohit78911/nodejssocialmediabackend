const mongoose = require('mongoose')
const express =  require('express')
const router = express.Router()
const comments = require('../Model/comments')

router.get('/',(req,res)=>{
    comments.find().then((result)=>{
        res.status(200).json(result)
        console.log("Comments Fetch Successfully")
    }).catch((erroor)
})