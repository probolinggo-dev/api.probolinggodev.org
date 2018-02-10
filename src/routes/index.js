const Router = require('./Router');
const router = new Router();

// controllers
const userController = require('../controller/userController');

router.post('/user', userController.create);

module.exports = router.create();
