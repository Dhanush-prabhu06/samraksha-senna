const Chat = require('../../models/chatModel');
const AgencyAdmin = require('../../models/agencyAdmin');


const fetchChats = async(req,res)=>{

    const CurrentUser = req.id;
    //console.log(CurrentUser);
    try {
    let result = await Chat.find({users:{$elemMatch : { $eq:CurrentUser}}})
        .populate('users','-AgencyPassword')
        .populate('lastMessage')
        .populate('GroupAdmin','-AgencyPassword')
        .sort({updatedAt:-1}); //1 for ascending and -1 for descending
        //console.log(result);
        result = await AgencyAdmin.populate(result,{
                path:'lastMessage.sender',
                select:'AgencyName AgencyEmail'
        });
        return res.status(200).json({result});

    } catch (error) {
        res.status(400)
        console.log(error);
    }    
}

module.exports = fetchChats;