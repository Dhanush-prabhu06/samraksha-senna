const Message = require("../../models/MessageModel");
const AgencyAdmin = require('../../models/agencyAdmin');
const Chat = require("../../models/chatModel");

const sendMessage = async(req,res) =>{

    const {content , chatID} = req.body;

    if( !content || !chatID){
        console.log('Invalid Data passed');
        return res.sendStatus(400);
    }

    let newMsg = {
        sender:req.id,
        content,
        chat:chatID
    };

    try {
        
        let msg = await Message.create(newMsg)

        msg = await msg.populate('sender','-AgencyPassword');
        msg = await msg.populate('chat');
        msg = await AgencyAdmin.populate(msg,{
            path:'chat.users',
            select:'AgencyName AgencyEmail'
        });

        msg = await Chat.populate(msg,{
            path:'chat.lastMessage',
            select:'sender content chat'
        });

        msg = await Chat.populate(msg,{
            path:'chat.lastMessage.sender',
            select:'AgencyName AgencyEmail'
        });



        await Chat.findByIdAndUpdate(chatID,{
            lastMessage:msg
        });


        return res.status(200).json(msg);
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

}

module.exports = {sendMessage};