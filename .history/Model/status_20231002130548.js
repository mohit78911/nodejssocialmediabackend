const mongoose = require("mongoose")

let statusSchema = new mongoose.Schema({
    _id :mongoose.Types.schema ,
    status : String
})