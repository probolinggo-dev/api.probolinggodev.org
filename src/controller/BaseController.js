const fs = require('fs');
const path = require('path');
const gmailSend = require('gmail-send');
const handlebars = require('handlebars');
const config = require('../../config');


class BaseController {
  sendEmail(payload) {
    const {to, subject, template, data} = payload;
    fs.readFile(path.resolve(__dirname, '../../template', template), 'utf8', (err, text) => {
      const template = handlebars.compile(text);
      gmailSend({
        user: config.gmail.email,
        pass: config.gmail.password,
        to,
        subject,
        html: template(data)
      })();
    });
  }
}

module.exports = BaseController;
