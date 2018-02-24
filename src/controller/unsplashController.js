const BaseController = require('./BaseController');
const Unsplash = require('../models/unsplash');
const R = require('ramda');

class UnsplashController extends BaseController {
  get(req) {
    const page = parseInt(R.pathOr(1, ['query','page'], req));
    let limit = parseInt(R.pathOr(10, ['query','page_page'], req));
    limit = limit > 30 ? 30 : limit;
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Unsplash.paginate({}, {page: R.or(page, 1), limit: R.or(limit, 10)});
        return resolve(result);
      } catch (err) {
        return reject({
          code: 500,
          message: 'Aku lelah kak'
        });
      }
    });
  }
}

module.exports = new UnsplashController();
