const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Friends =  require("../Model/friendsList")

router.get("/friends",async(req,res)=>{
   Friends.find() 
})