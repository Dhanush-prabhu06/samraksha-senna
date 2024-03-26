require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TwilioNumber = process.env.TWILIO_NUMBER;
const apinumber = process.env.GOOGLE_URL_API;
const client = require('twilio')(accountSid, authToken);


const AlertAgency = async (req, res) => {
    
    const {
        UserLongitude,
        UserLatitude,
        AgencyNumber
    } = req.body;

    client.messages
        .create({
            from: `${TwilioNumber}`,
            to: `+91 ${AgencyNumber}`,
            body: `
            User Has reported the emergency from ---->
            https://www.google.com/maps/dir/?api=${apinumber}&origin=My+Location&destination=${UserLatitude},${UserLongitude}`
        })
        .then((res) => {
            console.log('Message Sent');
        })
        .catch((err) => { console.log(err); });



    client.calls
        .create({
            twiml: `<Response> <Say language="en-US" voice="Polly.Joanna"> Hello. This is an emergency alert from User please check our SMS </Say> </Response>`,
            to: `+91 ${AgencyNumber}`,
            from: `${TwilioNumber}`
        })
        .then(call => console.log(call.sid,'Call sent'))
        .catch((err) => { console.log(err); });

}

module.exports = AlertAgency;