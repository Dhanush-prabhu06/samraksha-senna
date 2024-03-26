const mongoose = require('mongoose');

const GovtSchema = mongoose.Schema({
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
    Department:{
        type:String,
        required:true
    }
});

module.exports = new mongoose.model('GovtDepartmentDB',GovtSchema);