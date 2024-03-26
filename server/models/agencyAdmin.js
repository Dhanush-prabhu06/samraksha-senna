const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
    AgencyName:{
        type:String,
        required:true,
        unique:true
    },
    AgencyNumber:{
        type:String,
        required:true,
    },
    AgencyEmail:{
        type:String,
        required:true,
        unique:true
    },
    AgencyAddress:{
        type:String,
        required:true
    },
    AgencyDescription:{
        type:String,
        required:true
    },
    AgencyCategory:{
        type:String,
        required:true,
    },
    AgencyLongitude:{
        type:Number,
        required:true
    },
    AgencyLatitude:{
        type:Number,
        required:true
    },
    AgencyPassword:{
        type:String,
        required:true,
        minlength:6
    }
})

module.exports = new mongoose.model('AgenciesDB',agencySchema);