const mongoose = require("mongoose")

let statusSchema = new mongoose.Schema({
    _id :mongoose.Schema.Types.objectid ,
    status : String
})