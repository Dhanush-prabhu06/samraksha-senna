const mongoose = require('mongoose');

const agencyLoactionSchema = new mongoose.Schema({
    AgencyName:{
        type:String,
        required:true,
        unique:true
    },
    Longitude:{
        type:String,
        required:true
    },
    Latitude:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    AgencyNumber:{
        type:String,
        required:true,
    },
});

module.exports = new mongoose.model('AgencyLocationDB',agencyLoactionSchema);