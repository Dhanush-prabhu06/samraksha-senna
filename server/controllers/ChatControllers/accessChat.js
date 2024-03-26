const Chat = require('../../models/chatModel');
const AgencyAdmin = require('../../models/agencyAdmin');

const acessChats = async(req,res)=>{

    const {chatUser} = req.body; //Not Logged in User // User to chat With
    const CurrentUser = req.id;

    if(!chatUser){
        console.log('ChatUserID is Not sent in param');
        return res.sendStatus(400);
    }

    let isChat = await Chat.find({
        GroupChat:false,
        $and:[
            {users:{$elemMatch : { $eq:CurrentUser}}},
            {users:{$elemMatch : { $eq:chatUser}}}     //Find Both Users
        ]
    })  .populate('users','-AgencyPassword')
        .populate('lastMessage');

    isChat = await AgencyAdmin.populate(isChat,{
        path:'lastMessage.sender',
        select:'AgencyName AgencyEmail'
    });
    
    if (isChat.length > 0){
        return res.status(200).json(isChat[0]);
    } else {
        NewChatData = {
            chatName:'sender',
            GroupChat:false,
            users:[CurrentUser,chatUser]
        };

        try {
            const createdChat = await Chat.create(NewChatData);

            const FullChat = await Chat.findOne({_id:createdChat._id})
                .populate('users','-AgencyPassword')
                // .populate('lastMessage');

            return res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            console.log(error);
        }
    }

}

module.exports = acessChats;