const mongoose = require('mongoose')
const express =  require('express')
const router = express.Router()
const comments = require('../Model/comments')

router.get('/',(req,res)=>{
    comments
})