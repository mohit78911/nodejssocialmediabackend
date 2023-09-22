const express = require('express')
const router = express.Router()
const posts = require('../Model/Post')

router.get('/',async (req,res)=>{
    posts.find().then((result)=>{
        res.status(200).json(result)
        console.log('post find successfully')
    }).catch((error)=>{
        console.log('post can"t fetch...')
    })
})