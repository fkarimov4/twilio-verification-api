require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.send2FA = (req, res) => {
  const userNumber = req.body.userNumber;
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: userNumber, channel: "sms" })
    .then((verification) => {
      res.status(200).send({
        status: "Success",
        message: "2FA code sent",
        sid: verification.sid,
      });
    })
    .catch((err) => console.log(err));
};

exports.verify2FA = (req, res) => {
  const userNumber = req.body.userNumber;
  const userCode = req.body.userCode;
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({ to: userNumber, code: userCode })
    .then((verification_check) => {
        res.status(200).send({
            status: verification_check.status,
            message: "2FA code verified",
        });
    })
    .catch((err) => console.log(err));
};
