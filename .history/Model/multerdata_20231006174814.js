const mongoose = require("mongoose")

const multerSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    createdAt :{
        type : Date,
        
    }
})