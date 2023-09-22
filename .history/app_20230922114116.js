const server = require('./Routes')
const port = process.env.PORT || 6600
const express = require('express')
const app = express()

app.listen(port,()=>{
    console.log(`server start with ${}`)
})