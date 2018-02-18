const Quotes = require('../models/quotes');

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
}

module.exports = new QuoteController();
