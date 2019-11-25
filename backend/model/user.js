const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String
         },
        lastName:{
            type:String,
        },
        email:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
    },
        house:[{type: mongoose.Schema.Types.ObjectId,
            ref:'House'}]
    }
)

module.exports = mongoose.model('User', userSchema);