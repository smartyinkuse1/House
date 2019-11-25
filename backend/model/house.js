const mongoose = require('mongoose');
const houseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type: Number
    },
    landlord:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    mode:{
        type:String,
        required:true
    },
    img:[{
        
    }]


})
module.exports = mongoose.model('House', houseSchema)