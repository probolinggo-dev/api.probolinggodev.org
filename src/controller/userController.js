const Users = require('../models/users');
const hash = require ('../utils/hash.js');
const auth = require('../utils/auth');
const R = require('ramda');
const ERR_MESSAGES = {
  NO_EMAIL: 'no email provided',
  NO_PASSWORD: 'no password provided',
  USER_NOT_FOUND: 'user not found',
  WRONG_PASSWORD: 'password was wrong',
  FAILED: 'authentication failed',
};

class UserController {
  create(req) {
    const input = req.body;
    return new Promise(async (resolve, reject) => {
      try {
        const {password, email} = input;
        const passwordHash = await hash.create(password);
        const tokenValidation = await hash.create(email);
        const payload = Object.assign({}, input, {
          password: passwordHash,
          tokenValidation,
        });
        const User = new Users(payload);
        User.save((err, data) => {
          if (err) return reject(err);
          const {_id, username, email, name} = data;
          return resolve({
            _id,
            username,
            email,
            name
          });
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  auth(req) {
    const input = req.body;
    const {email, password} = input;
    return new Promise((resolve, reject) => {
      if (R.isEmpty(email)) return reject(ERR_MESSAGES.NO_EMAIL);
      if (R.isEmpty(email)) return reject(ERR_MESSAGES.NO_PASSWORD);

      Users.findOne({email}, async (err, data) => {
        if (err) return reject(ERR_MESSAGES.USER_NOT_FOUND);

        const {password: hashedPassword} = data;
        try {
          const isValid = hash.validate(password, hashedPassword);
          if (R.not(isValid)) return reject(ERR_MESSAGES.WRONG_PASSWORD);
          const token = auth.generateToken({
            email
          });
          return resolve({
            code: 200,
            token: token,
            message: 'Enjoy your token!'
          });
        } catch (err) {
          return reject(ERR_MESSAGES.FAILED);
        }
      });
    });
  }
}

module.exports = new UserController();
