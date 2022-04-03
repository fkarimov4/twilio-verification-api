require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.verify.services(process.env.TWILIO_SERVICE_ID)
             .verifications
             .create({to: '+19173929054', channel: 'sms'})
             .then(verification => console.log(verification.sid))
             .catch(err => console.log(err));