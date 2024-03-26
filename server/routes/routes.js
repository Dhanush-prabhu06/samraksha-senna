const express = require('express');
const route = express.Router();

const Register = require('../controllers/Register');
const Login = require('../controllers/Login');
const Verifytoken = require('../middlewares/verifyAuth');
const Logout = require('../controllers/Logout');
const refreshToken = require('../middlewares/refreshToken');
const AlertAgency = require('../controllers/AlertAgency');
const {getAgencyLoactions,getAdmin,getAllAgency, getEveryThing} = require('../controllers/AgencyInfo');
const AssistAlert = require('../controllers/AssistAlert');
const {PostLicense, getLicense} = require('../controllers/AgencyLicense');
const registerGovt = require('../controllers/GovtDepartment');


//Post Requests
route.post('/register',Register);
route.post('/login',Login);
route.post('/logout',Verifytoken,Logout);
route.post('/alertAgency',AlertAgency)
route.post('/assistNeeded',AssistAlert);
route.post('/postLicense',PostLicense);
route.post('/getLicense',getLicense);
route.post('/registerGovt',registerGovt);

// //Get Requests
route.get('/getEveryThing/?',getEveryThing);
route.get('/agencyLocations',getAgencyLoactions);
route.get('/getAllagencies',Verifytoken,getAllAgency)
route.get('/agencyAdminInfo',Verifytoken,getAdmin);
route.get('/refreshToken',refreshToken,Verifytoken,getAdmin);



module.exports = route ;





