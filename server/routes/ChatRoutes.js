const express = require('express');
const routes = express.Router();

const Verifytoken = require('../middlewares/verifyAuth');
const acessChats = require('../controllers/ChatControllers/accessChat');
const fetchChats = require('../controllers/ChatControllers/fetchChats');
const createGroupChat = require('../controllers/ChatControllers/createGroupChat');
const addToGroup = require('../controllers/ChatControllers/addToGroup');
const removeFromGroup = require('../controllers/ChatControllers/removeFromGroup.js');
const {sendMessage} = require('../controllers/MessgaeControllers/SendMessages');
const allMessages = require('../controllers/MessgaeControllers/allMessages');




//Post Requests
routes.post('/getChat',Verifytoken,acessChats);
routes.post('/createGroup',Verifytoken,createGroupChat);

//Get Requests
routes.get('/fetchUserChats',Verifytoken,fetchChats);

//put Requests
routes.put('/removeFromGroup',Verifytoken,removeFromGroup);
routes.put('/addToGroup',Verifytoken,addToGroup);


//Messaging Routes

//post Requests
routes.post('/sendMsg',Verifytoken,sendMessage);


//Get requests

routes.get('/getMsg/:chatID',Verifytoken,allMessages)


module.exports = routes;

