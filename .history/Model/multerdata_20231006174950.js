const mongoose = require("mongoose")

const multerSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    createdAt :{
        type : Date,
        default :Date.now
    },
    name : {
        type : String,
        required : [true , "Uploaded F"]
    }
})