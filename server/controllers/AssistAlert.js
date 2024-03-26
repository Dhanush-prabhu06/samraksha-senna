require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TwilioNumber = process.env.TWILIO_NUMBER;
const apinumber = process.env.GOOGLE_URL_API;
const client = require('twilio')(accountSid, authToken);


const AssistAlert = async (req, res) => {
    
    const {
        UserLongitude,
        UserLatitude,
        AssitType,
        Message,
        AgencyNumberToCall,
        AgencyNumberNeedAssit
    } = req.body;

    client.messages
        .create({
            from: `${TwilioNumber}`,
            to: `+91 ${AgencyNumberToCall}`,
            body: `
            Emergency Assist Alert from ${AgencyNumberNeedAssit} . Need ${AssitType} in Location below :
            https://www.google.com/maps/dir/?api=${apinumber}&origin=My+Location&destination=${UserLatitude},${UserLongitude}`
        })
        .then((res) => {
            console.log('Message Sent');
            
        })
        .catch((err) => { console.log(err); });



    client.calls
        .create({
            twiml: `<Response> <Say language="en-US" voice="Polly.Joanna"> Hello , This is an Emergency Assist Call from ${AgencyNumberNeedAssit} . Message From Them is ${Message} </Say> </Response>`,
            to: `+91 ${AgencyNumberToCall}`,
            from: `${TwilioNumber}`
        })
        .then((call) => {
            console.log(call.sid,'Call sent')
            return res.status(200).json({message:'Call and Message Sent'});
        } )
        .catch((err) => { console.log(err); });

}

module.exports = AssistAlert;