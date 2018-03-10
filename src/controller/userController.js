const BaseController = require('./BaseController');
const Users = require('../models/users');
const Quotes = require('../models/quotes');
const UserMeta = require('../models/userMeta');
const hash = require ('../utils/hash.js');
const auth = require('../utils/auth');
const config = require('../../config');
const R = require('ramda');

const ERR_MESSAGES = {
  NO_EMAIL: 'no email provided',
  NO_PASSWORD: 'no password provided',
  USER_NOT_FOUND: 'user not found',
  WRONG_PASSWORD: 'password was wrong',
  FAILED: 'authentication failed',
};

class UserController extends BaseController {
  constructor() {
    super();
    this.create = this.create.bind(this);
  }

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

          this.sendEmail({
            to: email,
            subject: 'Please verify your email address',
            template: 'email/validation.html',
            data: {
              year: new Date().getFullYear(),
              verificationLink: `${config.baseUrl}/user/settings/validate?token=${tokenValidation}&email=${email}`
            }
          });

          return resolve({
            code: 200,
            message: 'open your email and verify',
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

  update(req) {
    const {_id} = req.decoded;
    return new Promise((resolve, reject) => {
      UserMeta.findOne({user: _id}, (err, meta) => {
        if (err) return reject({});

        if (R.isNil(meta)) {
          const Meta = new UserMeta({
            user: _id,
            ...req.body
          });
          return Meta.save((err, data) => {
            if (err) return reject({});
            const {_id: metaId} = data;
            Users.findById(_id, (errUser, user) => {
              if (errUser) return reject({});
              Object.assign(user, {
                meta: metaId,
              });

              user.save((errSaveUser) => {
                if (errSaveUser) return reject({});

                return resolve({message: 'success'});
              });
            });
          });
        }

        Object.assign(meta, req.body);
        meta.save((err, data) => {
          if (err) return reject({});

          return resolve(data);
        });
      });
    });
  }

  quotes(req) {
    const {username} = req.params;
    const page = parseInt(R.pathOr(1, ['query','page'], req));
    let limit = parseInt(R.pathOr(10, ['query','page_page'], req));
    limit = limit > 30 ? 30 : limit;
    return new Promise(async (resolve, reject) => {
      try {
        const user = await Users.findOne({username})
          .select('-r -password -tokenValidation -isValidated -quotes')
          .populate({path: 'meta', select: '-r'});
        const {_id} = user;
        const result = await Quotes
          .paginate(
            {user: _id},
            {
              select: '-r',
              sort: {updatedAt: -1},
              page: R.or(page, 1),
              limit: R.or(limit, 10)
            }
          );
        return resolve({
          ...result,
          ...{
            docs: result.docs.map(item => ({
              quote: item._doc,
              user: user._doc,
            }))
          }
        });
      } catch (err) {
        return reject({
          code: 500,
          message: 'Aku lelah kak'
        });
      }
    });
  }

  info(req) {
    const username = R.pathOr(null, ['params','username'], req);
    const _id = R.pathOr(null, ['decoded', '_id'], req);
    return new Promise((resolve, reject) => {
      if (R.isNil(username)) {
        Users.findById(_id)
          .select('-password -tokenValidation -quotes')
          .populate({path: 'meta', select: '-_id -user -updatedAt -createdAt -__v'})
          .exec((err, user) => {
            if (err) return reject({code: 520, message: 'Unknown Error'});
            return resolve(user);
          });
      } else {
        Users.findOne({username})
          .select('-password -tokenValidation -quotes')
          .populate({path: 'meta', select: '-_id -user -updatedAt -createdAt -__v'})
          .exec((err, user) => {
            if (err) return reject({code: 520, message: 'Unknown Error'});
            return resolve(user);
          });
      }
    });
  }

  auth(req) {
    const input = req.body;
    const {email, password} = input;
    return new Promise(async (resolve, reject) => {

      // check if email or password is empty then return reject
      req.check('email').exists();
      req.check('password').exists();
      const validator = await req.getValidationResult();
      const validatorMsg = validator.mapped();
      if (R.not(R.isEmpty(validatorMsg))) {
        return reject({
          code: 401,
          message: validatorMsg,
        });
      }

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

  validate(req) {
    const invalidResponse = {
      code: 401,
      message: 'your validation link is not valid!'
    };
    const {email, token} = req.query;
    return new Promise((resolve, reject) => {
      Users.findOne({email}, (err, user) => {
        if (err) return reject(invalidResponse);
        if (R.isEmpty(user)) return reject(invalidResponse);
        if (token !== user.tokenValidation) return reject(invalidResponse);

        user.tokenValidation = '';
        user.isValidated = true;
        user.save();

        return resolve({
          code: 200,
          message: 'your email has been verified!'
        });
      });
    });
  }
}

module.exports = new UserController();
