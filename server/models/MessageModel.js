const mongoose = require('mongoose');
const AgencyAdmin = require('./agencyAdmin');


const MessageSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:AgencyAdmin
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{timestamps:true});

module.exports = new mongoose.model('Message',MessageSchema);