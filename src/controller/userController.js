const Users = require('../models/users');
const hash = require ('../utils/hash.js');

class UserController {
  create(input) {
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
}

module.exports = new UserController();
