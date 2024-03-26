const LicenseDB = require('../models/LicenseNumber');

const PostLicense = async(req,res) =>{
    const {LicenseNumber} = req.body;

    try {
        const push = await LicenseDB.create({LicenseNumber});

        res.status(200).json(push);
    } catch (error) {
        console.log(error);
    }
    
}

const getLicense = async(req,res) =>{
    
    const {LicenseNumber} = req.body;

    try {
        const fetch = await LicenseDB.findOne({LicenseNumber});
        res.status(200).json(fetch);
    } catch (error) {
        res.status(400).json(error.message)
    }
    
}

module.exports = {PostLicense,getLicense};