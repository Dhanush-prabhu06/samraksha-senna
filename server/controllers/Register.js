const AgencyAdmin = require('../models/agencyAdmin');
const AgencyLocations = require('../models/agencyLoactions');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const Register = async (req, res) => {

    const { 
        AgencyName,
        AgencyNumber,
        AgencyEmail,
        AgencyAddress,
        AgencyDescription,
        AgencyCategory,
        AgencyLongitude,
        AgencyLatitude,
        AgencyPassword
    } = req.body;

    try {
        const exsistingEmail = await AgencyAdmin.findOne({ AgencyEmail: AgencyEmail });
        if (exsistingEmail) return (res.status(400).json({ message: 'Email Already Registered' }))
    } catch (error) {
        console.log(error)
    }

    const hashedPass = bcrypt.hashSync(AgencyPassword)


    const AgencyObj = {
        AgencyName,
        AgencyNumber,
        AgencyEmail,
        AgencyAddress,
        AgencyDescription,
        AgencyCategory,
        AgencyLongitude,
        AgencyLatitude,
        AgencyPassword: hashedPass,
    };

    const AgencyLocation_Obj = {
        AgencyName,
        Category:AgencyCategory,
        Longitude:AgencyLongitude,
        Latitude:AgencyLatitude,
        AgencyNumber
    }

    try {
        const AgencyAdmins = await AgencyAdmin.create(AgencyObj);
        const AgenciesLocations = await AgencyLocations.create(AgencyLocation_Obj);
        return res.status(201).json({
            Agencies:AgencyAdmins,
            Locations:AgenciesLocations
        });
    } catch (error) {
        console.log(error);
    }

}
module.exports = Register;