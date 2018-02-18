const Router = require('./Router');
const router = new Router();

// middlewares
const authMiddleware = require('../middleware/authMiddleware');

// controllers
const userController = require('../controller/userController');
const quoteController = require('../controller/quoteController');

router.post('/user', userController.create);
router.post('/auth', userController.auth);

// quotes
router.post('/quote', quoteController.create, authMiddleware);

module.exports = router.create();
