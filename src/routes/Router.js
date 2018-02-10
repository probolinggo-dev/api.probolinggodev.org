const express = require('express');
const router = express.Router();

class Router {
  get(...params) {this.matcher('get', ...params);}
  post(...params) {this.matcher('post', ...params);}
  patch(...params) {this.matcher('patch', ...params);}
  put(...params) {this.matcher('put', ...params);}
  delete(...params) {this.matcher('delete', ...params);}

  matcher(method, route, action, middlewares = []) {
    let r;
    switch (method) {
    case 'get':
      r = router.get.bind(router);
      break;
    case 'post':
      r = router.post.bind(router);
      break;
    case 'patch':
      r = router.patch.bind(router);
      break;
    case 'put':
      r = router.put.bind(router);
      break;
    case 'delete':
      r = router.delete.bind(router);
      break;
    default:
      r = router.get.bind(router);
      break;
    }

    r(route, middlewares, async (req, res) => {
      try {
        const data = await action(req.body);
        return res.json(data);
      } catch (err) {
        return res.status(500).json({
          message: 'Something went wrong!'
        });
      }
    });
  }

  create() {return router;}
}

module.exports = Router;
