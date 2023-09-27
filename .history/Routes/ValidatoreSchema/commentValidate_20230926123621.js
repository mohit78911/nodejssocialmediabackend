





const joi = require('joi')

exports.commentSchema = joi.object({
    comment : joi.string().required
})