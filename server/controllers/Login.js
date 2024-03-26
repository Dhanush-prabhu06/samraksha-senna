const AgencyAdmin = require('../models/agencyAdmin');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const Login = async(req,res) => {
  const { AgencyName, AgencyPassword } = req.body;

  let existingUser;
  try {
    existingUser = await AgencyAdmin.findOne({ AgencyName:AgencyName });
  } catch (err){
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Agency not found. Register Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(AgencyPassword, existingUser.AgencyPassword);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Name / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_KEY, {
    expiresIn: "1hrs",
  });

  console.log("Generated Token\n", token);

  if (req.cookies) {
    req.cookies[`${existingUser._id}`] = "";
  }

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 ), 
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", Agency: existingUser}); //Token has encrypted data of id of current user

}

module.exports = Login;