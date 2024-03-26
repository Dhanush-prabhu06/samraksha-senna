const mongoose = require('mongoose');

const LicenseSchema = mongoose.Schema({
    LicenseNumber:{
        type:Number,
        required:true,
        unique:true
    }
})

module.exports = new mongoose.model('LicenseDB',LicenseSchema);