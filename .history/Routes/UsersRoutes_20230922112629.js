const express = require('express')
const app = express()
const users =  require('../Model/Users')

app.get('/', async (req,res)=>{
    users.find()
})