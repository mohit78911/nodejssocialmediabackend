const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const likes = require('../Model/like')

router.get('/',(req,res)=>{
    likes.find().then((result)=>{
        res.status(200).json
    })
})