const mongoose = require('mongoose');
const AgencyAdmin = require('./agencyAdmin');
const Message = require('../models/MessageModel');

const chatSchema = new mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    GroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:AgencyAdmin
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Message
    },
    GroupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:AgencyAdmin
    }
},{timestamps:true});


module.exports = new mongoose.model('Chat',chatSchema)