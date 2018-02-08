const Users = require('../models/users');

const create = (input) => {
  return new Promise((resolve, reject) => {
    const User = new Users(input);
    User.save((err, data) => {
      if (err) reject(err);

      resolve(data);
    });
  });
}

module.exports = {
  create,
}
