const jwt = require('jsonwebtoken');
const config = require('../../config');

class Auth {
  generateToken(payload, expiresIn = '7d') {
    const token = jwt.sign(payload, config.secretKey, {
      expiresIn,
    });
    return token;
  }
}

module.exports = new Auth();
