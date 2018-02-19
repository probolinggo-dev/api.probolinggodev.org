const fs = require('fs');
const gmailSend = require('gmail-send');
const config = require('./config');
const handlebars = require('handlebars');
const {email, password} = config.gmail;

fs.readFile('./template/email/validation.html', 'utf8', (err, data) => {
  const template = handlebars.compile(data);
  gmailSend({
    user: email,
    pass: password,
    to: 'adeyahyaprasetyo@gmail.com',
    subject: 'ping',
    html: template({
      year: new Date().getFullYear(),
      verificationLink: 'https://google.com'
    })
  })();
});
