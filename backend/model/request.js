const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema(
    {
        FirstName:{
            type: String
         },
        LastName:{
            type:String,
        },
        Telephone:{
            type: Number
        },
        Address:{
            type: String
        },
        email:{
            type:String
        },
        Username:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        }
    })
module.exports = mongoose.model('Request', requestSchema)