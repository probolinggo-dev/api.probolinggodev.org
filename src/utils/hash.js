const bcrypt = require('bcryptjs');
const R = require('ramda');

const create = (str) => {
  return new Promise(async (resolve, reject) => {
    if (R.isEmpty(str))
      reject({
        message: 'You can\'t hash empty string',
      });

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(str, salt);
      resolve(hash);
    } catch (err) {
      reject(err);
    }
  });
}

const validate = (str = '', hash = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = bcrypt.compare(str, hash);
      if (res) {
        resolve(res);
      } else {
        reject(res);
      }
    } catch (err) {
      reject (err);
    }
  })
}

module.exports = {
  create,
  validate,
}
