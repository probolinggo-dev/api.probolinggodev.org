const Users = require('../models/users');
const hash = require ('../utils/hash.js');

const create = (input) => {
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
        if (err) reject(err);

        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  create,
};
