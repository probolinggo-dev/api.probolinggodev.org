const BaseController = require('./BaseController');
const CuratedUrls = require('../models/curatedUrls');
const R = require('ramda');

class TelegramBotController extends BaseController {
  constructor() {
    super();
    this.getCurrentUrls = this.getCurrentUrls.bind(this);
  }

  getCurrentUrls() {
    return new Promise(async (resolve, reject) => {
      try {
        const date = new Date();
        const yesterday = date.getDate() - 1;
        const urls = await CuratedUrls.find({createdAt: {
          '$gte': new Date(yesterday),
        }});
        return resolve(R.or(urls, []));
      } catch (err) {
        return reject(err);
      }
    });
  }
}

module.exports = new TelegramBotController();
