const Quotes = require('../models/quotes');
const R = require('ramda');

class QuoteController {
  create(req) {
    const input = req.body;
    const {_id} = req.decoded;
    return new Promise((resolve, reject) => {
      const Quote = new Quotes(Object.assign({}, input, {
        user: _id,
      }));

      Quote.save((err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }

  get(req) {
    const {id} = req.params;
    return new Promise((resolve, reject) => {
      Quotes.findById(id)
        .populate({
          path: 'user',
          select: '_id email username name'
        })
        .exec((err, data) => {
          if (err) return reject({
            code: 404,
            message: 'quote not found!',
          });

          return resolve(data);
        });
    });
  }

  search(req) {
    const keyword = R.pathOr('', ['params','keyword'], req);
    const regex = new RegExp(keyword, 'i');
    return new Promise((resolve, reject) => {
      Quotes.find({content: regex})
        .limit(10)
        .populate({
          path: 'user',
          select: '_id email username name'
        })
        .exec((err, data) => {
          if (err) return reject({
            code: 404,
            message: 'quote not found!',
          });

          if (R.isEmpty(data)) return reject({
            code: 404,
            message: 'quote not found!',
          });

          return resolve(data);
        });
    });
  }

  random() {
    return new Promise((resolve, reject) => {
      Quotes.count().exec((err, count) => {
        if (err) return reject(err);

        const random = Math.floor(Math.random() * count);
        Quotes.findOne()
          .skip(random)
          .populate({
            path: 'user',
            select: '_id email username name'
          })
          .exec((err, data) => {
            if (err) return reject({
              code: 404,
              message: 'quote not found!',
            });

            return resolve(data);
          });
      });
    });
  }
}

module.exports = new QuoteController();
