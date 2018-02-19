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
router.get('/quote/search/:keyword?', quoteController.search);
router.get('/quote/random', quoteController.random);
router.get('/quote/:id', quoteController.get);
router.post('/quote', quoteController.create, authMiddleware);

module.exports = router.create();
