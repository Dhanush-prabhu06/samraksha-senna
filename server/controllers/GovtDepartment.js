const GovtDepartmentDB = require('../models/GovtModel');

const registerGovt = async(req,res) => {

    const { 
        AgencyName,
        AgencyNumber,
        AgencyEmail,
        AgencyAddress,
        Department
    } = req.body;

    const AgencyObj = {
        AgencyName,
        AgencyNumber,
        AgencyEmail,
        AgencyAddress,
        Department
    };


    try {
        const exsistingEmail = await GovtDepartmentDB.findOne({ AgencyEmail: AgencyEmail });
        if (exsistingEmail) return (res.status(400).json({ message: 'Email Already Registered' }))
    } catch (error) {
        console.log(error)
    }

    try {
        const Department = await GovtDepartmentDB.create(AgencyObj);
        return res.status(201).json(Department);
    } catch (error) {
        console.log(error);
    }
}

module.exports = registerGovt;