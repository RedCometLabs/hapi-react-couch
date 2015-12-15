import config from '../config';
import nodemailer from 'nodemailer';

const baseUrl = 'http://' + config.app.host + ':' + config.app.clientport + '/';

var transporter = nodemailer.createTransport({
  service: 'Mandrill',
  auth: {
    user: config.mandrill.user,
    pass: config.mandrill.password
  }
});

export function sendResetPasswordEmail (uniqueIdentifier, email) {
  const mailOptions = {
    to: email,
    from: config.mandrill.emailFromAddress,
    subject: 'Reset your password on Spectre',
    text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      baseUrl + '#reset/' + uniqueIdentifier + '/'+ email + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  return sendEmail(mailOptions);
}

function sendEmail(mailOptions){

  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV === 'test') {
      console.log('This would have emailed the client in the normal environment', mailOptions);
      resolve('This would have emailed the client in the normal environment');
    } else {
      transporter.sendMail(mailOptions, function(err) {
        if(err){
          reject(Error(err));
        }
        return;
      });
    }
  });
}
