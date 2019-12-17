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
        ref:'User',
        required:true
    },
    mode:{
        type:String,
        required:true
    },
    imagePath:[{
        type: String,
        required: true
    }]


})
module.exports = mongoose.model('House', houseSchema)