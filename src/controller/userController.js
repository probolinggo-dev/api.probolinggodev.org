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
    // Promise is used to handle async task, it used to replace callback
    return new Promise(async (resolve, reject) => {
      try {
        // validation
        // here I use express validation that already injected into req in /src/routes/Router.js
        // docs https://github.com/ctavan/express-validator
        req.check('email').isEmail().trim().normalizeEmail().exists();
        req.check('username').isLength({ min: 5, max: 15 }).exists();
        req.check('password').isLength({ min: 8 }).exists();
        req.check('name').exists();

        const validator = await req.getValidationResult();
        const validatorMsg = validator.mapped();
        if (R.not(R.isEmpty(validatorMsg))) {
          return reject({
            code: 401,
            message: validatorMsg,
          });
        }

        // assign password & email into variable
        // the syntax seem weird? it called destructuring assignment
        // you can read the docs here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        const {password, email} = input;

        // hashing password & tokenValidation using bcrypt
        const passwordHash = await hash.create(password);
        const tokenValidation = await hash.create(email);

        // replace password & tokenValidation with hashed string
        // Object.assign is used to merge an object
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

        const {
          _id,
          username,
          password: hashedPassword,
          isValidated,
        } = data;
        try {
          const isValid = hash.validate(password, hashedPassword);
          if (R.not(isValid)) return reject(ERR_MESSAGES.WRONG_PASSWORD);
          const token = auth.generateToken({
            _id,
            username,
            email,
            isValidated
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
